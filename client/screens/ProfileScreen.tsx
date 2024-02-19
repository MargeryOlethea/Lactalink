import React from "react";
import { StyleSheet, Text, View } from "react-native";

function ProfileScreen() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.upperContainer}></View>
        <View style={styles.bottomContainer}></View>
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
    paddingBottom: 10,
  },
});

export default ProfileScreen;
