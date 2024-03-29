import React, { useContext, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../components/Logo";
import {
  LoginContextType,
  LoginInput,
  LoginResponse,
  UnauthenticateParamList,
} from "../types/all.types";
import axios, { AxiosError } from "axios";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import BoxAlert from "../components/BoxAlert";
import * as SecureStore from "expo-secure-store";
import { LoginContext } from "../contexts/LoginContext";
import Loading from "../components/Loading";

export default function LoginScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<UnauthenticateParamList>>();

  // REDIRECT TO REGISTER
  const redirectToRegister = () => {
    navigation.navigate("registerId");
  };

  // LOGIN HANDLE FORM
  const [loginForm, setLoginForm] = useState<LoginInput>({
    email: "",
    password: "",
  });

  const handleInput = (field: string, value: string) => {
    setLoginForm({ ...loginForm, [field]: value.toLowerCase() });
  };

  // HANDLE LOGIN
  const { setIsLoggedIn, setIsDonor } = useContext(LoginContext);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const url = process.env.EXPO_PUBLIC_API_URL;
      const { data }: { data: { data: LoginResponse } } = await axios.post(
        `${url}/login`,
        loginForm,
      );

      await SecureStore.setItemAsync("token", data.data.access_token);
      await SecureStore.setItemAsync("userId", data.data.userId);
      await SecureStore.setItemAsync("userName", data.data.name);
      await SecureStore.setItemAsync("userLocation", data.data.location);
      await SecureStore.setItemAsync("userRole", data.data.role);

      if (!data.data.isRegistered) {
        navigation.navigate("detailRegister");
      } else {
        setIsLoggedIn(true);
        if (data.data.role == "donor") {
          setIsDonor(true);
        }
        if (data.data.role == "receiver") {
          setIsDonor(false);
        }
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
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Logo size={40} />
        <Text style={styles.title}>Log into your account</Text>
      </View>
      <View style={styles.bottomContainer}>
        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="your e-mail"
          onChangeText={(e) => handleInput("email", e)}
          autoComplete="off"
          autoCorrect={false}
        />

        {/* PASSWORD */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="your password"
          onChangeText={(e) => handleInput("password", e)}
          onSubmitEditing={handleLogin}
          autoComplete="off"
          autoCorrect={false}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>Don't have an account yet? </Text>
          <Pressable onPress={redirectToRegister}>
            <Text style={styles.pressableText}>Register here</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#1f2937",
  },
  upperContainer: {
    height: "35%",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  bottomContainer: {
    height: "65%",
    backgroundColor: "#8CB9BD",
    borderTopEndRadius: 50,
    paddingHorizontal: 30,
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
    marginTop: 30,
    justifyContent: "center",
  },
  subTitleText: {
    color: "#1f2937",
    fontSize: 12,
  },
  pressableText: {
    fontWeight: "600",
    color: "white",
    fontSize: 12,
    textDecorationLine: "underline",
  },
});
