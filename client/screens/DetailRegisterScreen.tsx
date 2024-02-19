import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { UserDetailType } from "../types/all.types";
import Checkbox from "expo-checkbox";
import {
  bloodrhesusDropdown,
  bloodtypeDropdown,
  genderDropdown,
} from "../data/dropdownDatas";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "../components/Loading";
import axios, { AxiosError } from "axios";
import BoxAlert from "../components/BoxAlert";
import { LoginContext } from "../contexts/LoginContext";

export default function DetailRegisterScreen() {
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

  // GET ACCESS TOKEN FOR POST
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

  useFocusEffect(
    React.useCallback(() => {
      fetchName();
      fetchRole();
      fetchToken();
    }, []),
  );

  // BOTTOM CHECKBOX
  const [formHonesty, setFormHonesty] = useState<boolean>(false);
  const [formStatement, setFormStatement] = useState<boolean>(false);

  //HANDLE FORM
  const [formRegister, setFormRegister] = useState<UserDetailType>({
    babyName: "",
    babyDOB: "",
    babyGender: "",
    bloodType: "",
    bloodRhesus: "",
    halal: false,
    egg: false,
    dairy: false,
    nuts: false,
    soy: false,
    seafood: false,
    flourOrWheat: false,
    redMeat: false,
    spicyFood: false,
    caffeine: false,
  });

  const handleInput = (field: string, value: string | boolean): void => {
    setFormRegister({ ...formRegister, [field]: value });
  };

  // HANDLE REGISTER
  const [loading, setLoading] = useState<boolean>(false);
  const { setIsLoggedIn } = useContext(LoginContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const url = process.env.EXPO_PUBLIC_API_URL;
      await axios.post(`${url}/users/detail`, formRegister, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (role === "donor" && !formStatement) {
        BoxAlert("Error!", "Please check the required field!");
      } else if (!formHonesty) {
        BoxAlert("Error!", "Please check the required field!");
      } else {
        setIsLoggedIn(true);
        BoxAlert("Success!", "Successfully created your data!");
      }
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

  if (loading) {
    return <Loading />;
  }
  return (
    <ScrollView>
      <View style={styles.upperContainer}>
        {name && role && (
          <>
            <Text style={styles.name}>Hi, {name}!</Text>
            <Text style={styles.role}>Role: {role}</Text>
          </>
        )}

        <Text style={styles.mainText}>
          Let's get started! Help us know you better.
        </Text>
        <Text style={styles.caution}>
          Your honesty can change lives. Answer openly, truthfully, for mothers
          & babies.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        {/* NAME */}
        <Text style={styles.label}>Baby's Name</Text>
        <TextInput
          style={styles.input}
          placeholder="your baby's name"
          onChangeText={(e) => handleInput("babyName", e)}
          value={formRegister.babyName}
          autoComplete="off"
          autoCorrect={false}
        />

        {/* DOB */}
        <Text style={styles.label}>Baby's Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          onChangeText={(e) => handleInput("babyDOB", e)}
          value={formRegister.babyDOB}
          autoComplete="off"
          autoCorrect={false}
        />

        {/* GENDER */}
        <Text style={styles.label}>Baby's Gender</Text>
        <Dropdown
          style={styles.dropdownInput}
          data={genderDropdown}
          placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
          selectedTextStyle={{ fontSize: 14 }}
          labelField="label"
          valueField="value"
          placeholder="your baby's gender"
          onChange={(gender) => handleInput("babyGender", gender.value)}
          value={formRegister.babyGender}
        />

        {/* BLOODTYPE */}
        <Text style={styles.label}>Blood Type</Text>
        <Dropdown
          style={styles.dropdownInput}
          data={bloodtypeDropdown}
          placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
          selectedTextStyle={{ fontSize: 14 }}
          labelField="label"
          valueField="value"
          placeholder="your blood type"
          onChange={(bloodtype) => handleInput("bloodType", bloodtype.value)}
          value={formRegister.bloodType}
        />

        {/* BLOOD RHESUS */}
        <Text style={styles.label}>Blood Rhesus</Text>
        <Dropdown
          style={styles.dropdownInput}
          data={bloodrhesusDropdown}
          placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
          selectedTextStyle={{ fontSize: 14 }}
          labelField="label"
          valueField="value"
          placeholder="your blood rhesus"
          onChange={(bloodrhesus) =>
            handleInput("bloodRhesus", bloodrhesus.value)
          }
          value={formRegister.bloodRhesus}
        />

        {/* FOOD CHECKBOXES */}
        <Text style={styles.label}>
          {role && role === "donor"
            ? "I DO consume:"
            : "My baby is NOT allergic to:"}
        </Text>
        {/* HALAL */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.halal}
            onValueChange={(e) => {
              handleInput("halal", e);
            }}
            style={styles.checkbox}
          />
          <View>
            <Text style={styles.checkboxText}>Halal food*</Text>
            <Text style={styles.disclaimer}>
              *uncheck this if you consume non-halal food
            </Text>
          </View>
        </View>

        {/* EGG */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.egg}
            onValueChange={(e) => {
              handleInput("egg", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Egg</Text>
        </View>

        {/* DAIRY */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.dairy}
            onValueChange={(e) => {
              handleInput("dairy", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Dairy</Text>
        </View>

        {/* NUTS */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.nuts}
            onValueChange={(e) => {
              handleInput("nuts", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Nuts</Text>
        </View>

        {/* SOY */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.soy}
            onValueChange={(e) => {
              handleInput("soy", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Soy</Text>
        </View>

        {/* SEAFOOD */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.seafood}
            onValueChange={(e) => {
              handleInput("seafood", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Seafood</Text>
        </View>

        {/* FLOUR OR WHEAT */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.flourOrWheat}
            onValueChange={(e) => {
              handleInput("flourOrWheat", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Flour or Wheat</Text>
        </View>

        {/* RED MEAT */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.redMeat}
            onValueChange={(e) => {
              handleInput("redMeat", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Red Meat</Text>
        </View>

        {/* SPICY FOOD */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.spicyFood}
            onValueChange={(e) => {
              handleInput("spicyFood", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Spicy Food</Text>
        </View>

        {/* CAFFEINE */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={formRegister.caffeine}
            onValueChange={(e) => {
              handleInput("caffeine", e);
            }}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>Caffeine</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View style={styles.agreementContainer}>
            <Checkbox
              value={formHonesty}
              onValueChange={setFormHonesty}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>
              I declare that I have filled out this form honestly and to the
              best of my knowledge.
            </Text>
          </View>

          {role === "donor" && (
            <View style={styles.agreementContainer}>
              <Checkbox
                value={formStatement}
                onValueChange={setFormStatement}
                style={styles.checkbox}
              />
              <View>
                <Text style={styles.checkboxText}>
                  By checking this box, I declare that:
                </Text>

                <Text style={styles.forbiddenText}>• I am a non-smoker.</Text>
                <Text style={styles.forbiddenText}>
                  • I am not currently taking any medications that are harmful
                  to breastfeeding.
                </Text>
                <Text style={styles.forbiddenText}>
                  • I do not have any communicable diseases, such as HIV/AIDS or
                  Hepatitis B/C.
                </Text>
                <Text style={styles.forbiddenText}>
                  • I lead a healthy lifestyle.
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit My Data</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    height: "17%",
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  bottomContainer: {
    backgroundColor: "#8CB9BD",
    borderTopEndRadius: 50,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 150,
  },
  name: {
    fontWeight: "800",
    fontSize: 25,
    marginTop: 15,
    color: "#1f2937",
  },
  role: {
    borderColor: "#1f2937",
    color: "#1f2937",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: "35%",
    marginTop: 5,
    textAlign: "center",
  },
  mainText: {
    fontSize: 16,
    marginTop: 20,
    color: "#1f2937",
    fontWeight: "600",
  },
  caution: {
    color: "#5e8d91",
    fontSize: 12,
    paddingRight: 50,
    marginTop: 5,
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 20,
  },
  checkboxText: {
    color: "white",
    fontWeight: "800",
  },
  checkbox: {
    borderColor: "white",
  },
  disclaimer: {
    fontSize: 12,
    color: "white",
  },
  agreementContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  forbiddenText: {
    color: "#d91204",
    marginTop: 10,
    paddingRight: 20,
    fontWeight: "600",
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
});
