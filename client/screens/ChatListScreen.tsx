import { ScrollView, StyleSheet, View } from "react-native";
import ChatCard from "../components/ChatCard";

export default function ChatListScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 680,
    padding: 20,
  },
});
