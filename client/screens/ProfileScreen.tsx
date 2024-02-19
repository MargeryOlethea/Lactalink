import { useFocusEffect } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { UserDetailResponseType, UserDetailType } from "../types/all.types";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import Logo from "../components/Logo";
import Checkbox from "expo-checkbox";
import {
  bloodrhesusDropdown,
  bloodtypeDropdown,
  genderDropdown,
} from "../data/dropdownDatas";
import { Dropdown } from "react-native-element-dropdown";
import BoxAlert from "../components/BoxAlert";
import Loading from "../components/Loading";
import { LoginContext } from "../contexts/LoginContext";
import { AntDesign } from "@expo/vector-icons";

function ProfileScreen() {
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

  // EDIT MODE
  const [editMode, setEditMode] = useState<boolean>(false);

  // FETCH USER DATA
  const [userData, setUserData] = useState<UserDetailResponseType>();

  const fetchUserData = async () => {
    try {
      const url = process.env.EXPO_PUBLIC_API_URL;

      const { data } = await axios.get(`${url}/users/detail`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchToken();
    }, []),
  );
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [token, editMode]),
  );

  // HANDLE INPUT
  const [formDetail, setFormDetail] = useState<UserDetailType>({
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

  useEffect(() => {
    if (userData) {
      setFormDetail({
        babyName: userData.babyName,
        babyDOB: userData.babyDOB.split("T")[0],
        babyGender: userData.babyGender,
        bloodType: userData.bloodType,
        bloodRhesus: userData.bloodRhesus,
        halal: userData.halal,
        egg: userData.egg,
        dairy: userData.dairy,
        nuts: userData.nuts,
        soy: userData.soy,
        seafood: userData.seafood,
        flourOrWheat: userData.flourOrWheat,
        redMeat: userData.redMeat,
        spicyFood: userData.spicyFood,
        caffeine: userData.caffeine,
      });
    }
  }, [userData]);

  const handleInput = (field: string, value: string | boolean): void => {
    setFormDetail({ ...formDetail, [field]: value });
  };

  // HANDLE EDIT
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const url = process.env.EXPO_PUBLIC_API_URL;
      await axios.put(`${url}/users/detail`, formDetail, {
        headers: { Authorization: `Bearer ${token}` },
      });
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
      setEditMode(false);
      fetchUserData();
      setLoading(false);
      BoxAlert("Success!", "Successfully created your data!");
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
        console.log(error.message),
          BoxAlert("Error", error.message || "Oops! Something went wrong");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View>
            <Logo color="white" />

            <Text style={styles.name}>Hi, {userData?.user.name}!</Text>
            <Text style={styles.role}>Role: {userData?.user.role}</Text>
          </View>

          <View>
            <View
              style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
            >
              {/* LOGOUT */}
              <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <AntDesign name="logout" size={18} color="#5e8d91" />
              </Pressable>

              {/* EDIT */}
              <Pressable
                onPress={() => setEditMode(!editMode)}
                style={
                  editMode ? styles.editButtonActive : styles.editButtonInactive
                }
              >
                <Text
                  style={
                    editMode
                      ? { color: "#8CB9BD", fontWeight: "800" }
                      : { color: "white", fontWeight: "800" }
                  }
                >
                  Edit Profile
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* SCROLL VIEW BAWAH */}
        <ScrollView>
          <View style={styles.bottomContainer}>
            {/*====== FORM EDIT ======*/}
            {/* NAME */}
            <Text style={styles.label}>Baby's Name</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: editMode ? "white" : "#d9d9d9" },
              ]}
              placeholder="your baby's name"
              onChangeText={(e) => handleInput("babyName", e)}
              value={formDetail.babyName}
              autoComplete="off"
              autoCorrect={false}
              editable={editMode ? true : false}
            />

            {/* DOB */}
            <Text style={styles.label}>Baby's Date of Birth</Text>
            <TextInput
              style={[
                styles.input,
                { backgroundColor: editMode ? "white" : "#d9d9d9" },
              ]}
              placeholder="YYYY-MM-DD"
              onChangeText={(e) => handleInput("babyDOB", e)}
              value={formDetail.babyDOB}
              autoComplete="off"
              autoCorrect={false}
              editable={editMode ? true : false}
            />

            {/* GENDER */}
            <Text style={styles.label}>Baby's Gender</Text>
            <Dropdown
              style={[
                styles.dropdownInput,
                { backgroundColor: editMode ? "white" : "#d9d9d9" },
              ]}
              data={genderDropdown}
              placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
              selectedTextStyle={{ fontSize: 14 }}
              labelField="label"
              valueField="value"
              placeholder="your baby's gender"
              onChange={(gender) => handleInput("babyGender", gender.value)}
              value={formDetail.babyGender}
              disable={editMode ? false : true}
            />

            {/* BLOODTYPE */}
            <Text style={styles.label}>Blood Type</Text>
            <Dropdown
              style={[
                styles.dropdownInput,
                { backgroundColor: editMode ? "white" : "#d9d9d9" },
              ]}
              data={bloodtypeDropdown}
              placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
              selectedTextStyle={{ fontSize: 14 }}
              labelField="label"
              valueField="value"
              placeholder="your blood type"
              onChange={(bloodtype) =>
                handleInput("bloodType", bloodtype.value)
              }
              value={formDetail.bloodType}
              disable={editMode ? false : true}
            />

            {/* BLOOD RHESUS */}
            <Text style={styles.label}>Blood Rhesus</Text>
            <Dropdown
              style={[
                styles.dropdownInput,
                { backgroundColor: editMode ? "white" : "#d9d9d9" },
              ]}
              data={bloodrhesusDropdown}
              placeholderStyle={{ fontSize: 14, color: "#bdbcbb" }}
              selectedTextStyle={{ fontSize: 14 }}
              labelField="label"
              valueField="value"
              placeholder="your blood rhesus"
              onChange={(bloodrhesus) =>
                handleInput("bloodRhesus", bloodrhesus.value)
              }
              value={formDetail.bloodRhesus}
              disable={editMode ? false : true}
            />

            {/* FOOD CHECKBOXES */}
            <Text style={styles.label}>
              {userData?.user.role && userData?.user.role === "donor"
                ? "I DO consume:"
                : "My baby is NOT allergic to:"}
            </Text>
            {/* HALAL */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.halal}
                onValueChange={(e) => {
                  handleInput("halal", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
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
                value={formDetail.egg}
                onValueChange={(e) => {
                  handleInput("egg", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Egg</Text>
            </View>

            {/* DAIRY */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.dairy}
                onValueChange={(e) => {
                  handleInput("dairy", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Dairy</Text>
            </View>

            {/* NUTS */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.nuts}
                onValueChange={(e) => {
                  handleInput("nuts", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Nuts</Text>
            </View>

            {/* SOY */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.soy}
                onValueChange={(e) => {
                  handleInput("soy", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Soy</Text>
            </View>

            {/* SEAFOOD */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.seafood}
                onValueChange={(e) => {
                  handleInput("seafood", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Seafood</Text>
            </View>

            {/* FLOUR OR WHEAT */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.flourOrWheat}
                onValueChange={(e) => {
                  handleInput("flourOrWheat", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Flour or Wheat</Text>
            </View>

            {/* RED MEAT */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.redMeat}
                onValueChange={(e) => {
                  handleInput("redMeat", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Red Meat</Text>
            </View>

            {/* SPICY FOOD */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.spicyFood}
                onValueChange={(e) => {
                  handleInput("spicyFood", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Spicy Food</Text>
            </View>

            {/* CAFFEINE */}
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={formDetail.caffeine}
                onValueChange={(e) => {
                  handleInput("caffeine", e);
                }}
                style={styles.checkbox}
                disabled={editMode ? false : true}
              />
              <Text style={styles.checkboxText}>Caffeine</Text>
            </View>
            {editMode && (
              <Pressable style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitText}>Submit</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </View>
    </>
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
    paddingBottom: 20,
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
  editButtonActive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: "white",
  },
  editButtonInactive: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
  },
  label: {
    marginTop: 30,
    fontWeight: "600",
    color: "#5e8d91",
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
    color: "#5e8d91",
    fontWeight: "800",
  },
  checkbox: {
    borderColor: "#5e8d91",
  },
  disclaimer: {
    fontSize: 12,
    color: "#5e8d91",
  },
  submitButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#8CB9BD",
    backgroundColor: "#8CB9BD",
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 20,
  },
  submitText: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
  },
  logoutButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    marginBottom: 45,
  },
});

export default ProfileScreen;
