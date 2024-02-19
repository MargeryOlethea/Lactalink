import React, { useContext, useEffect, useRef } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { RouteProp, useFocusEffect, useRoute } from "@react-navigation/native";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import { HomeNavigationParamList, MessagesDataType } from "../types/all.types";
import BoxAlert from "../components/BoxAlert";
import { FirebaseError } from "firebase/app";
import { LoginContext } from "../contexts/LoginContext";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

export default function ChatRoomScreen() {
  const route = useRoute<RouteProp<HomeNavigationParamList>>();
  const roomId = route?.params?.roomId;

  // FETCH LOGGED ID USING LOGIC
  const [loggedUser, setLoggedUser] = useState<string>("");
  const [recipientUser, setRecipientUser] = useState<string>("");
  const { isDonor } = useContext(LoginContext);

  // FETCH MESSAGE
  const [messages, setMessages] = useState<MessagesDataType>([]);

  const snapMessages = () => {
    if (roomId) {
      onSnapshot(doc(db, "chats", roomId), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data().messages);
        }
      });

      const idOfTheRoom = roomId.split(" & ");

      // FIRST USER ID ALWAYS A DONOR, SECOND ALWAYS A RECEIVER
      if (isDonor) {
        setLoggedUser(idOfTheRoom[0]);
        setRecipientUser(idOfTheRoom[1]);
      } else {
        setLoggedUser(idOfTheRoom[1]);
        setRecipientUser(idOfTheRoom[0]);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      snapMessages();
    }, [roomId]),
  );

  // SEND MESSAGE
  const [text, setText] = useState<string>("");
  const sendMessage = async () => {
    try {
      if (roomId) {
        setText("");
        await updateDoc(doc(db, "chats", roomId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: loggedUser,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, "userChats", loggedUser), {
          [roomId + ".lastMessage"]: { text },
          [roomId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", recipientUser), {
          [roomId + ".lastMessage"]: { text },
          [roomId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.message);
        BoxAlert("Error!", error.message || "Oops! Something went wrong");
      }
      if (error instanceof Error) {
        console.log(error.message);
        BoxAlert("Error!", error.message || "Oops! Something went wrong");
      }
    }
  };

  // ALWAYS SCROLL FROM THE BOTTOM
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to the bottom of the list when component mounts
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <View style={styles.container}>
      {/* CHATS BUBBLE */}
      {messages.length === 0 && (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "gray" }}>Be the first one to start!</Text>
        </View>
      )}
      {messages.length > 0 && (
        <FlatList
          style={{
            paddingHorizontal: 20,
            marginVertical: 10,
            paddingVertical: -10,
          }}
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent:
                  item.senderId == loggedUser ? "flex-end" : "flex-start",
              }}
            >
              <View
                style={[
                  styles.chatBubble,
                  {
                    backgroundColor:
                      item.senderId == loggedUser ? "white" : "#8CB9BD",
                  },
                ]}
              >
                <Text
                  style={{
                    color: item.senderId !== loggedUser ? "white" : "#1f2937",
                  }}
                >
                  {item.text}
                </Text>
              </View>
            </View>
          )}
        />
      )}

      {/* TEXT INPUT */}
      <View style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your message..."
          onSubmitEditing={sendMessage}
          value={text}
          onChangeText={setText}
          autoComplete="off"
          autoCorrect={false}
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
    maxWidth: "80%",
  },
});
