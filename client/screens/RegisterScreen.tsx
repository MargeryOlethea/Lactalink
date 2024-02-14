import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LocationFetchResponse, RegisterUser } from "../types/all.types";
import Logo from "../components/Logo";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

export default function RegisterScreen() {
  // HANDLE PROVINCE
  const [provincesList, setProvincesList] = useState<LocationFetchResponse[]>();
  const [selectedProvince, setSelectedProvince] = useState<string>();
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
  const [selectedCity, setSelectedCity] = useState<string>();
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

  useEffect(() => {
    fetchProvince();
    if (selectedProvince) {
      fetchCity();
    }
  }, [selectedProvince]);

  // DROPDOWN ROLE
  const roleDropdown = [
    { label: "Receiver", value: "receiver" },
    { label: "Donor", value: "donor" },
  ];

  // HANDLE REGISTER
  const [formRegister, setFormRegister] = useState<RegisterUser>({
    name: "",
    email: "",
    password: "",
    profilePictureUrl: "",
    location: "",
    phoneNumber: "",
    role: "",
  });

  const handleInput = (field: string, value: string): void => {
    setFormRegister({ ...formRegister, [field]: value });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Logo size={30} />
        <Text style={styles.title}>Register your account</Text>
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
        <TextInput style={styles.input} placeholder="your name" />

        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="your e-mail" />

        {/* PHONE NUMBER */}
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} placeholder="your phone number" />

        {/* PASSWORD */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="your password"
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
              onChange={(city) => setSelectedCity(city.id)}
              value={selectedProvince}
            />
          </>
        )}

        {/* PROFILE PICTURE URL */}
        <Text style={styles.label}>Profile Picture</Text>
        <TextInput
          style={styles.input}
          placeholder="your profile picture URL"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.registerText}>Register Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  registerText: {
    color: "white",
    fontWeight: "600",
  },
});
