import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateMilkScreen from "../screens/CreateMilkScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";
import HomeChatStackNavigation from "./HomeChatStackNavigation";
import { RootNavigationParamList } from "../types/all.types";
import ChatListNavigationStack from "./ChatListStackNavigation";
import { LoginContext } from "../contexts/LoginContext";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator<RootNavigationParamList>();

export default function RootNavigation() {
  const { isDonor } = useContext(LoginContext);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { backgroundColor: "white" },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: ComponentProps<typeof Ionicons>["name"] = "home";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Create") {
            iconName = focused ? "add-circle" : "add-circle-outline";
            size = 30;
          } else if (route.name === "Chats") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "Profile") {
            iconName = focused
              ? "person-circle-sharp"
              : "person-circle-outline";
            size = 30;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#8CB9BD",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeChatStackNavigation}
        options={{ headerShown: false }}
      />
      {isDonor && (
        <Tab.Screen
          name="Create"
          component={CreateMilkScreen}
          options={{ title: "Create Post" }}
        />
      )}

      <Tab.Screen
        name="Chats"
        component={ChatListNavigationStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
