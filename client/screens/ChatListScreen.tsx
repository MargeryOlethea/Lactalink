import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ChatListScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.chatHolder}>
          <Text>XIXIXI</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 680,
  },
  chatHolder: {
    backgroundColor: "white",
  },
});
