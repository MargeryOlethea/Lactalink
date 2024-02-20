import React from "react";
import { View, ActivityIndicator } from "react-native";
function Loading() {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color="#5e8d91" />
      </View>
    </>
  );
}

export default Loading;
