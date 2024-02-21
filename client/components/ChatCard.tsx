import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { ChatNavigationParamList } from "../types/all.types";

function ChatCard() {
  // HANDLE PINDAH KE CHATROOM
  const navigation =
    useNavigation<NativeStackNavigationProp<ChatNavigationParamList>>();

  const moveToChatRoom = () => {
    navigation.navigate("Chat", { roomId: "2" });
  };
  return (
    <>
      {/* CHAT CARD START*/}
      <Pressable style={styles.chatHolder} onPress={moveToChatRoom}>
        <Image
          style={styles.profilePicture}
          source={{
            uri: "https://i.pinimg.com/564x/b8/5f/3a/b85f3a28fd572685b0dab45537113294.jpg",
          }}
        />
        <View>
          <Text style={styles.name}>Sumiyati</Text>
          <Text style={styles.chatText} numberOfLines={1} ellipsizeMode="tail">
            Iyah say langsung aja yah nanti aku kirim
          </Text>
          <Text style={styles.timeStamp}>23:05</Text>
        </View>
      </Pressable>
      {/* CHAT CARD END */}
    </>
  );
}

const styles = StyleSheet.create({
  profilePicture: {
    width: "20%",
    aspectRatio: "1/1",
    borderRadius: 100,
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

export default ChatCard;
