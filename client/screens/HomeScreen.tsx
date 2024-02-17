import React, { useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Logo from "../components/Logo";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { LocationFetchResponse, MilkResponseType } from "../types/all.types";
import axios, { AxiosError } from "axios";
import PostCard from "../components/PostCard";
import { AntDesign } from "@expo/vector-icons";
import { LoginContext } from "../contexts/LoginContext";
import BoxAlert from "../components/BoxAlert";
import * as SecureStore from "expo-secure-store";
import sliceStringToPairs from "../helpers/sliceLocation";
import Loading from "../components/Loading";

export default function HomeScreen() {
  // GET NAME FOR HEADER
  const [name, setName] = useState<string>("");
  const fetchName = async () => {
    try {
      const loggedName = await SecureStore.getItemAsync("userName");
      if (loggedName) {
        const splittedName = loggedName.split(" ");
        setName(splittedName[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET ROLE FOR HEADER
  const [role, setRole] = useState<string>("");
  const fetchRole = async () => {
    try {
      const loggedRole = await SecureStore.getItemAsync("userRole");
      if (loggedRole) {
        setRole(loggedRole);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET LOCATION FOR FILTER
  const [province, setProvince] = useState<string>("");
  const fetchLocation = async () => {
    try {
      const loggedLocation = await SecureStore.getItemAsync("userLocation");
      if (loggedLocation) {
        setCity(loggedLocation);
        const slicedLocation = sliceStringToPairs(loggedLocation);
        setProvince(slicedLocation[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET ACCESS TOKEN FOR GET
  const [token, setToken] = useState<string>("");
  const fetchToken = async () => {
    try {
      const loggedToken = await SecureStore.getItemAsync("token");
      if (loggedToken) {
        setToken(loggedToken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE LOGOUT
  const { setIsLoggedIn } = useContext(LoginContext);
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("userId");
      await SecureStore.deleteItemAsync("userName");
      await SecureStore.deleteItemAsync("userLocation");
      await SecureStore.deleteItemAsync("userRole");

      setIsLoggedIn(false);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message), BoxAlert("Error", error.message);
      }
    }
  };

  // HANDLE CITY
  const [citiesList, setCitiesList] = useState<LocationFetchResponse[]>();
  const [city, setCity] = useState<string>();
  const fetchCity = async () => {
    try {
      const data = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${province}.json`,
      );
      setCitiesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // FETCH HOME DATA
  const [loading, setLoading] = useState<boolean>(false);
  const [milkDatas, setMilkDatas] = useState<MilkResponseType[]>([]);
  const fetchHomeData = async () => {
    try {
      setLoading(true);

      const url = process.env.EXPO_PUBLIC_API_URL;
      const { data } = await axios.get(`${url}/milks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data) {
        setMilkDatas(data.data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response.data.message);
          // BoxAlert("Error!", error.response.data.message);
        }
      } else if (error instanceof Error) {
        console.log(error.message);
        BoxAlert("Error!", error.message || "Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchName();
    fetchRole();
    fetchToken();
    fetchHomeData();
  }, []);

  useEffect(() => {
    fetchCity();
  }, [province]);

  useEffect(() => {
    fetchHomeData();
  }, [city, token]);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View>
          <Logo color="white" />
          <Text style={styles.name}>Hi, {name}!</Text>
          <Text style={styles.role}>Role: {role}</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          {/* LOGOUT */}
          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <AntDesign name="logout" size={18} color="#5e8d91" />
          </Pressable>

          {/* FILTER BY LOCATION */}
          <Text style={{ color: "white", fontWeight: "600" }}>
            Filter by Location:
          </Text>

          <Dropdown
            style={styles.dropdownInput}
            data={citiesList || []}
            placeholderStyle={{ fontSize: 14, color: "white" }}
            selectedTextStyle={{ fontSize: 10, color: "white" }}
            labelField="name"
            valueField="id"
            placeholder="City..."
            onChange={(e) => setCity(e.id)}
            value={city}
          />
        </View>
      </View>
      <ScrollView>
        <View style={styles.bottomContainer}>
          {/* CARD */}
          {milkDatas.map((milkData) => (
            <PostCard key={milkData._id} milkData={milkData} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upperContainer: {
    backgroundColor: "#8CB9BD",
    height: "30%",
    borderBottomEndRadius: 50,
    paddingVertical: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  name: {
    fontWeight: "800",
    fontSize: 25,
    marginTop: 35,
    color: "white",
  },
  role: {
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 5,
    textAlign: "center",
  },
  dropdownInput: {
    borderColor: "white",
    color: "white",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 10,
    width: 160,
  },
  logoutButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
});
