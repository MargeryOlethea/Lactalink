import React, { useContext } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import Logo from "../components/Logo";
import { Dropdown } from "react-native-element-dropdown";
import { useEffect, useState } from "react";
import { LocationFetchResponse } from "../types/all.types";
import axios from "axios";
import PostCard from "../components/PostCard";
import { AntDesign } from "@expo/vector-icons";
import { LoginContext } from "../contexts/LoginContext";
import BoxAlert from "../components/BoxAlert";
import * as SecureStore from "expo-secure-store";

export default function HomeScreen() {
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
  const userProvince = "36";
  const [citiesList, setCitiesList] = useState<LocationFetchResponse[]>();
  const [selectedCity, setSelectedCity] = useState<string>();
  const fetchCity = async () => {
    try {
      const data = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${userProvince}.json`,
      );

      setCitiesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userProvince) {
      fetchCity();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <View>
          <Logo color="white" />
          <Text style={styles.name}>Hi, Annisa!</Text>
          <Text style={styles.role}>Role: Donor</Text>
        </View>

        {citiesList && (
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
              data={citiesList}
              placeholderStyle={{ fontSize: 14, color: "white" }}
              selectedTextStyle={{ fontSize: 10, color: "white" }}
              labelField="name"
              valueField="id"
              placeholder="City..."
              onChange={(e) => setSelectedCity(e.id)}
              value={selectedCity}
            />
          </View>
        )}
      </View>
      <ScrollView>
        <View style={styles.bottomContainer}>
          {/* CARD */}
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
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
