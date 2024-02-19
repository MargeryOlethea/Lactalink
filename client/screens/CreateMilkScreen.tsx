import React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  HomeNavigationParamList,
  MilkForm,
  RootNavigationParamList,
} from "../types/all.types";
import Logo from "../components/Logo";
import axios, { AxiosError } from "axios";
import BoxAlert from "../components/BoxAlert";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function CreateMilkScreen() {
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
      fetchToken();
    }, []),
  );

  // HANDLE INPUT
  const [milkForm, setMilkForm] = useState<MilkForm>({
    totalBags: "",
    totalMl: "",
    pumpDate: "",
  });

  const handleInput = (field: string, value: string): void => {
    setMilkForm({ ...milkForm, [field]: value });
  };

  // HANDLE CREATE
  const navigation =
    useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();
  const [loading, setLoading] = useState<boolean>(false);
  const handleCreate = async () => {
    try {
      setLoading(true);

      const body = {
        totalBags: +milkForm.totalBags,
        totalMl: +milkForm.totalMl,
        pumpDate: milkForm.pumpDate,
      };
      const url = process.env.EXPO_PUBLIC_API_URL;
      await axios.post(`${url}/milks`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMilkForm({
        totalBags: "",
        totalMl: "",
        pumpDate: "",
      });

      navigation.navigate("Home");

      BoxAlert("Success", "Success created post!");
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
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.upperContainer}>
          <Logo size={25} />
          <Text style={styles.title}>Make a new post</Text>
        </View>
        <View style={styles.bottomContainer}>
          {/* BAG */}
          <Text style={styles.label}>Total Bag</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: 10 bags"
            keyboardType="numeric"
            onChangeText={(e) => handleInput("totalBags", e)}
            value={milkForm.totalBags}
            autoComplete="off"
            autoCorrect={false}
          />

          {/* SIZE */}
          <Text style={styles.label}>Total ml/Bag</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: 200 ml"
            keyboardType="numeric"
            onChangeText={(e) => handleInput("totalMl", e)}
            value={milkForm.totalMl}
            autoComplete="off"
            autoCorrect={false}
          />

          {/* PUMP DATE */}
          <Text style={styles.label}>Pump Date</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            onChangeText={(e) => handleInput("pumpDate", e)}
            value={milkForm.pumpDate}
            autoComplete="off"
            autoCorrect={false}
          />

          {/* BUTTON */}
          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    height: "20%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  bottomContainer: {
    backgroundColor: "#8CB9BD",
    paddingHorizontal: 20,
    borderTopEndRadius: 50,
    paddingBottom: 40,
    height: "80%",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    color: "#1f2937",
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
