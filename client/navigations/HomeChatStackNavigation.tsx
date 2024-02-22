import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import { HomeNavigationParamList } from "../types/all.types";

const Stack = createNativeStackNavigator<HomeNavigationParamList>();

function HomeChatStackNavigation() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen name="Chat" component={ChatRoomScreen} />
      </Stack.Navigator>
    </>
  );
}

export default HomeChatStackNavigation;
