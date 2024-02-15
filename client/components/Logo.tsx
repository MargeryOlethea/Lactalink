import { StyleSheet, Text, View } from "react-native";

export default function Logo({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  return (
    <Text style={[styles.logo, { fontSize: size, color }]}>LactaLink</Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontWeight: "800",
    fontSize: 20,
    color: "#8CB9BD",
  },
});
