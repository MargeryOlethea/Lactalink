import React from "react";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  LocationFetchResponse,
  RegisterUser,
  UnauthenticateParamList,
} from "../types/all.types";
import Logo from "../components/Logo";
import { Dropdown } from "react-native-element-dropdown";
import axios, { AxiosError } from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { roleDropdown } from "../data/dropdownDatas";
import BoxAlert from "../components/BoxAlert";
import Loading from "../components/Loading";

export default function RegisterScreen() {
  const route = useRoute<RouteProp<UnauthenticateParamList>>();
  const cityId = route?.params?.cityId;
  const provinceId = route?.params?.provinceId;

  // REDIRECT TO LOGIN
  const navigation =
    useNavigation<NativeStackNavigationProp<UnauthenticateParamList>>();

  const redirectToLogin = () => {
    navigation.navigate("login");
  };

  // HANDLE PROVINCE
  const [provincesList, setProvincesList] = useState<LocationFetchResponse[]>();
  const [selectedProvince, setSelectedProvince] = useState<string>(
    provinceId || "",
  );
  const fetchProvince = async () => {
    try {
      const data = await axios.get(
        "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json",
      );

      setProvincesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // HANDLE CITY
  const [citiesList, setCitiesList] = useState<LocationFetchResponse[]>();
  const fetchCity = async () => {
    try {
      const data = await axios.get(
        `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`,
      );

      setCitiesList(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProvince();
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      if (selectedProvince) {
        fetchCity();
      }
    }, [selectedProvince]),
  );

  // HANDLE REGISTER
  const [loading, setLoading] = useState<boolean>(false);
  const handleRegister = async () => {
    try {
      setLoading(true);

      const url = process.env.EXPO_PUBLIC_API_URL;

      const { data } = await axios.post(`${url}/registration`, formRegister);

      navigation.navigate("login");

      BoxAlert("Success!", "Successfully registered, please login!");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response.data.message);
          BoxAlert("Error!", error.response.data.message);
        }
      } else if (error instanceof Error) {
        console.log(error.message);
        BoxAlert("Error!", error.message || "Oops! Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT
  const [formRegister, setFormRegister] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
    profilePictureUrl: "",
    location: cityId || "",
    phoneNumber: "",
    role: "",
  });

  const handleInput = (field: string, value: string): void => {
    setFormRegister({ ...formRegister, [field]: value });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Logo size={40} />
          <Text style={styles.title}>Register your account</Text>

          <View style={styles.subTitle}>
            <Text style={styles.subTitleText}>Already have an account? </Text>
            <Pressable onPress={redirectToLogin}>
              <Text style={styles.pressableText}>Log in here</Text>
            </Pressable>
          </View>
        </View>

        {/* FORM START */}
        <View style={styles.form}>
          {/* ROLE */}
          <Text style={styles.label}>Role</Text>
          <Dropdown
            style={styles.dropdownInput}
            data={roleDropdown}
            placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
            selectedTextStyle={{ fontSize: 14 }}
            labelField="label"
            valueField="value"
            placeholder="your role..."
            onChange={(role) => handleInput("role", role.value)}
            value={formRegister.role}
          />

          {/* NAME */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => handleInput("name", e)}
            value={formRegister.name}
            placeholder="your name"
          />

          {/* PROVINSI */}
          {provincesList && (
            <>
              <Text style={styles.label}>Province</Text>
              <Dropdown
                style={styles.dropdownInput}
                data={provincesList}
                placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
                selectedTextStyle={{ fontSize: 14 }}
                labelField="name"
                valueField="id"
                placeholder="your province..."
                onChange={(province) => setSelectedProvince(province.id)}
                value={selectedProvince}
              />
            </>
          )}

          {/* KOTA */}
          {citiesList && selectedProvince && (
            <>
              <Text style={styles.label}>City</Text>
              <Dropdown
                style={styles.dropdownInput}
                data={citiesList}
                placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
                selectedTextStyle={{ fontSize: 14 }}
                labelField="name"
                valueField="id"
                placeholder="your city..."
                onChange={(city) => handleInput("location", city.id)}
                value={formRegister.location}
              />
            </>
          )}

          {/* EMAIL */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => handleInput("email", e.toLowerCase())}
            value={formRegister.email}
            placeholder="your e-mail"
          />

          {/* PHONE NUMBER */}
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={(e) => handleInput("phoneNumber", e)}
            value={formRegister.phoneNumber}
            placeholder="your phone number"
          />

          {/* PASSWORD */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="your password"
            onChangeText={(e) => handleInput("password", e)}
            value={formRegister.password}
          />

          {/* BUTTON */}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#1f2937",
  },
  form: {
    backgroundColor: "#8CB9BD",
    borderTopEndRadius: 50,
    marginTop: 50,
    paddingHorizontal: 30,
    paddingBottom: 50,
    paddingTop: 30,
  },
  label: {
    marginTop: 30,
    fontWeight: "600",
    color: "white",
  },
  input: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    paddingVertical: 15,
    color: "black",
  },
  dropdownInput: {
    borderRadius: 20,
    backgroundColor: "white",
    color: "white",
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  button: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    paddingVertical: 15,
    borderColor: "white",
    borderWidth: 3,
    marginHorizontal: "auto",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
  subTitle: {
    flexDirection: "row",
    marginTop: 5,
  },
  subTitleText: {
    color: "#1f2937",
    fontSize: 12,
  },
  pressableText: {
    fontWeight: "600",
    color: "#8CB9BD",
    fontSize: 12,
    textDecorationLine: "underline",
  },
});
