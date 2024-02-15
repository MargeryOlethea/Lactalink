import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

function PostCard() {
  return (
    <>
      {/* CARD START */}
      <View style={styles.cardContainer}>
        <View style={styles.compatibilityCircle}>
          <Text style={{ color: "white", fontWeight: "500" }}>Match:</Text>
          <Text style={{ color: "white", fontWeight: "800", fontSize: 25 }}>
            85%
          </Text>
        </View>
        <View>
          <View style={styles.textFlex}>
            <Text style={styles.cardName}>Ariana</Text>
            <Text>
              <FontAwesome6 name="location-dot" size={14} color="black" />{" "}
              Tangerang
            </Text>
          </View>
          <Text style={{ fontWeight: "600", color: "green" }}>Halal</Text>

          <View style={styles.textFlex}>
            <Text>
              Blood: <Text style={{ fontWeight: "800" }}>B</Text>
            </Text>
            <Text>
              Rhesus: <Text style={{ fontWeight: "800" }}>+</Text>
            </Text>
          </View>

          <Text style={{ color: "gray", fontStyle: "italic" }}>
            Pumped on: 2023-02-07
          </Text>
          <View style={{ alignItems: "flex-end" }}>
            <Pressable style={styles.chatButton}>
              <Text style={styles.buttonText}>Chat</Text>
            </Pressable>
          </View>
        </View>
      </View>
      {/* CARD END */}
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    backgroundColor: "white",
    borderRadius: 30,
    flexDirection: "row",
    gap: 20,
    marginBottom: 20,
  },
  compatibilityCircle: {
    backgroundColor: "#8CB9BD",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    aspectRatio: "1/1",
  },
  chatButton: {
    backgroundColor: "#8CB9BD",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "800",
  },
  textFlex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardName: {
    color: "#1f2937",
    fontWeight: "800",
    fontSize: 18,
  },
});

export default PostCard;
