import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Logo from "../components/Logo";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.upperContainer}>
        <Logo size={40} />
        <Text style={styles.title}>Log into your account</Text>
      </View>
      <View style={styles.bottomContainer}>
        {/* EMAIL */}
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="your e-mail" />

        {/* PASSWORD */}
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="your password"
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <View style={styles.subTitle}>
          <Text style={styles.subTitleText}>Don't have an account yet? </Text>
          <Pressable>
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
