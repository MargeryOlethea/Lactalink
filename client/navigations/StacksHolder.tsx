import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import RootNavigation from "./RootNavigation";
import LoginScreen from "../screens/LoginScreen";
import IdRegisterScreen from "../screens/IdRegisterScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DetailRegisterScreen from "../screens/DetailRegisterScreen";

const Stack = createNativeStackNavigator();

const StacksHolder = () => {
  const { isLoggedIn } = useContext(LoginContext) || { isLoggedIn: false };
  // const isLoggedIn = false;
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <>
              <Stack.Screen
                name="authenticatedScreen"
                component={RootNavigation}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="login" component={LoginScreen} />
              <Stack.Screen name="registerId" component={IdRegisterScreen} />
              <Stack.Screen name="register" component={RegisterScreen} />
              <Stack.Screen
                name="detailRegister"
                component={DetailRegisterScreen}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default StacksHolder;
