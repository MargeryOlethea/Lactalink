import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ChatListScreen from "../screens/ChatListScreen";
import CreateMilkScreen from "../screens/CreateMilkScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ComponentProps } from "react";

const Tab = createBottomTabNavigator();

export default function RootNavigation() {
  const logoutFunction = () => {
    console.log("hehe");
  };
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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5e8d91",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Create"
        component={CreateMilkScreen}
        options={{ title: "Create New Post" }}
      />
      <Tab.Screen name="Chats" component={ChatListScreen} />
    </Tab.Navigator>
  );
}
