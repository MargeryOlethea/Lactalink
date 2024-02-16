import React from "react";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import IdRegisterScreen from "./screens/IdRegisterScreen";
import ChatListScreen from "./screens/ChatListScreen";
import ChatRoomScreen from "./screens/ChatRoomScreen";
import CreateMilkScreen from "./screens/CreateMilkScreen";
import DetailRegisterScreen from "./screens/DetailRegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import RootNavigation from "./navigations/RootNavigation";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootNavigation />

        {/* DONE */}
        {/* <IdRegisterScreen /> */}
        {/* <RegisterScreen /> */}
        {/* <LoginScreen /> */}
        {/* <DetailRegisterScreen /> */}
      </NavigationContainer>
    </>
  );
}
