import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View, Text } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { ChatDataType, ChatNavigationParamList } from "../types/all.types";
import { FontAwesome } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { dateConverter, formatDate } from "../helpers/dateConverter";

export default function ChatListScreen() {
  // GET ID FOR CHAT
  const [userId, setUserId] = useState<string>("");
  const fetchUserId = async () => {
    try {
      const loggedUserId = await SecureStore.getItemAsync("userId");
      if (loggedUserId) {
        setUserId(loggedUserId);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchUserId();
    }, []),
  );

  // FETCH CHAT
  const [chats, setChats] = useState<ChatDataType | undefined>();

  const snapChats = () => {
    onSnapshot(doc(db, "userChats", userId), (doc) => {
      setChats(doc.data());
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      if (userId) {
        snapChats();
      }
    }, [userId]),
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<ChatNavigationParamList>>();

  const moveToChatRoom = () => {
    navigation.navigate("Chat", { roomId: "2" });
  };
  console.log(chats, "ini chats beb");
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* HEHEHE */}
        {!chats && (
          <>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text style={{ color: "gray" }}>No chats yet</Text>
            </View>
          </>
        )}
        {/* HEHEHE */}
        {chats &&
          Object.entries(chats).map((chat) => (
            <Pressable
              style={styles.chatHolder}
              onPress={moveToChatRoom}
              key={chat[0]}
            >
              <FontAwesome name="user-circle" size={60} color="#8CB9BD" />
              <View>
                <Text style={styles.name}>{chat[1].userInfo.userName}</Text>
                <Text
                  style={styles.chatText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {chat[1].lastMessage?.text}
                </Text>
                <Text style={styles.timeStamp}>
                  {formatDate(dateConverter(chat[1].date))}
                </Text>
              </View>
            </Pressable>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 680,
    padding: 20,
  },
  chatHolder: {
    backgroundColor: "white",
    padding: 10,
    paddingHorizontal: 20,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 10,
    flexDirection: "row",
    gap: 20,
    marginBottom: 15,
  },
  name: {
    fontWeight: "800",
    fontSize: 18,
    color: "#1f2937",
  },
  chatText: {
    width: "90%",
    marginTop: 5,
    color: "gray",
  },
  timeStamp: {
    color: "gray",
    fontSize: 10,
    textAlign: "right",
    marginRight: 30,
    marginTop: 5,
  },
});
