import { StyleSheet, Text, View } from "react-native";

export default function Logo({ size }: { size: number }) {
  return <Text style={[styles.logo, { fontSize: size }]}>LactaLink</Text>;
}

const styles = StyleSheet.create({
  logo: {
    fontWeight: "800",
    fontSize: 20,
    color: "#8CB9BD",
  },
});
