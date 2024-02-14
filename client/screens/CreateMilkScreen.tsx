import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function CreateMilkScreen() {
  return (
    <View style={styles.container}>
      <Text>Create Milk Screen</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
