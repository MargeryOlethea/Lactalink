import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatRoomScreen from "../screens/ChatRoomScreen";
import ChatListScreen from "../screens/ChatListScreen";
import { ChatNavigationParamList } from "../types/all.types";

const Stack = createNativeStackNavigator();

function ChatListNavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatList"
        component={ChatListScreen}
        options={{ title: "Chats" }}
      />
      <Stack.Screen name="Chat" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}

export default ChatListNavigationStack;
