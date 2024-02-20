import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function ChatRoomScreen() {
  const [message, setMessage] = useState<string>("");
  const sendMessage = () => {};

  const dummyMessage = [
    { userId: 1, message: "aku di sini" },
    { userId: 1, message: "duduk manis menantimu" },
    { userId: 2, message: "aku pun ingin membuat kau tak menyesal" },
    { userId: 1, message: "bahwa kau telah" },
    { userId: 2, message: "memilih diriku kini" },
    {
      userId: 2,
      message: "yang akan terus membuat hidupmu indah",
    },
    { userId: 1, message: "aku di sini" },
    { userId: 1, message: "duduk manis menantimu" },
    { userId: 2, message: "aku pun ingin membuat kau tak menyesal" },
    { userId: 1, message: "bahwa kau telah" },
    { userId: 2, message: "memilih diriku kini" },
    {
      userId: 2,
      message: "yang akan terus membuat hidupmu indah",
    },
    { userId: 1, message: "aku di sini" },
    { userId: 1, message: "duduk manis menantimu" },
    { userId: 2, message: "aku pun ingin membuat kau tak menyesal" },
    { userId: 1, message: "bahwa kau telah" },
    { userId: 2, message: "memilih diriku kini" },
    {
      userId: 2,
      message: "yang akan terus membuat hidupmu indah",
    },
  ];
  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingHorizontal: 20, paddingVertical: 10 }}
        data={dummyMessage}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: item.userId == 2 ? "flex-end" : "flex-start",
            }}
          >
            <View
              style={[
                styles.chatBubble,
                {
                  backgroundColor: item.userId == 2 ? "white" : "#8CB9BD",
                },
              ]}
            >
              <Text style={{ color: item.userId !== 2 ? "white" : "#1f2937" }}>
                {item.message}
              </Text>
            </View>
          </View>
        )}
        inverted={true}
      />

      {/* TEXT INPUT */}

      <View style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your message..."
          onSubmitEditing={sendMessage}
          value={message}
          onChangeText={setMessage}
        />
        <Pressable onPress={sendMessage}>
          <MaterialCommunityIcons
            name="send-circle"
            size={40}
            color="#8CB9BD"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  textContainer: {
    backgroundColor: "white",
    padding: 10,
    paddingVertical: 12,

    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  textInput: {
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    width: "85%",
  },
  allChats: {
    justifyContent: "flex-end",
    minHeight: "100%",
    padding: 20,
  },
  chatBubble: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
  },
});
