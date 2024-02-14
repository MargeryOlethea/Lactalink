import { StyleSheet, Text, View } from "react-native";

export default function Logo() {
  return <Text style={styles.logo}>LactaLink</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontWeight: "800",
    fontSize: 20,
    color: "#8CB9BD",
  },
});
