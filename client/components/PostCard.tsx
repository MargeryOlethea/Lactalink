import React, { useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import {
  HomeNavigationParamList,
  MilkResponseType,
  PostCardPropsType,
} from "../types/all.types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import BoxAlert from "./BoxAlert";
import Loading from "./Loading";
import { LoginContext } from "../contexts/LoginContext";
import axios, { AxiosError } from "axios";

function PostCard({
  milkData,
  loggedUserId,
  loggedUserName,
  setTriggerRefetch,
  triggerRefetch,
  token,
}: PostCardPropsType) {
  // BUAT HANDLE TOMBOL CHAT ADA/GA
  const { isDonor } = useContext(LoginContext);

  // HANDLE CREATE / PINDAH KE CHATROOM
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();

  const [loading, setLoading] = useState<boolean>(false);
  const moveToChatRoom = async (donorUserId: string, donorName: string) => {
    try {
      setLoading(true);
      const roomId = `${donorUserId} & ${loggedUserId}`;

      const responseChats = await getDoc(doc(db, "chats", roomId));

      // CREATE A CHAT
      if (!responseChats.exists()) {
        await setDoc(doc(db, "chats", roomId), { messages: [] });
      }

      // CREATE LOGGED USER
      const responseLoggedUserChats = await getDoc(
        doc(db, "userChats", loggedUserId),
      );
      if (!responseLoggedUserChats.exists()) {
        await setDoc(doc(db, "userChats", loggedUserId), {});
      }

      // CREATE RECIPIENT USER
      const responseRecipientUserChats = await getDoc(
        doc(db, "userChats", donorUserId),
      );
      if (!responseRecipientUserChats.exists()) {
        await setDoc(doc(db, "userChats", donorUserId), {});
      }

      //UPDATE USER CHAT
      await updateDoc(doc(db, "userChats", loggedUserId), {
        [roomId + ".userInfo"]: { userId: donorUserId, userName: donorName },
        [roomId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", donorUserId), {
        [roomId + ".userInfo"]: {
          userId: loggedUserId,
          userName: loggedUserName,
        },
        [roomId + ".date"]: serverTimestamp(),
      });

      // NAVIGATE TO ROOM
      navigation.navigate("Chat", { roomId });
    } catch (error) {
      BoxAlert("Error!", "Oops! something is wrong!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // DELETE MILK
  const deleteMilk = async (milkId: string) => {
    try {
      setLoading(true);
      const url = process.env.EXPO_PUBLIC_API_URL;
      await axios.delete(`${url}/milks/${milkId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTriggerRefetch(!triggerRefetch);

      BoxAlert("Success!", "Success delete item!");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        if (error.response) {
          console.log(error.response.data.message);
          BoxAlert("Error!", error.response.data.message);
        }
      } else if (error instanceof Error) {
        console.log(error.message);
        BoxAlert("Error!", error.message || "Oops! Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // HANDLE MODAL DETAIL
  const [showDetail, setShowDetail] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* CARD START */}
      <View style={styles.cardContainer}>
        <View style={styles.compatibilityCircle}>
          <Text style={{ color: "white", fontWeight: "500" }}>Match:</Text>
          <Text style={{ color: "white", fontWeight: "800", fontSize: 25 }}>
            {`${milkData.score}%`}
          </Text>
        </View>
        <View style={{ width: "55%" }}>
          <View style={styles.textFlex}>
            <Text style={styles.cardName}>
              {milkData.user.name.split(" ")[0]}
            </Text>
            <Text style={{ fontSize: 12 }}>
              <Text style={{ fontWeight: "800" }}>{milkData.totalBags}</Text>{" "}
              pcs /{" "}
              <Text style={{ fontWeight: "800" }}>{milkData.totalMl}</Text> ml
            </Text>
          </View>
          {milkData.userdetail.halal ? (
            <Text style={{ fontWeight: "600", color: "green" }}>Halal</Text>
          ) : (
            <Text style={{ fontWeight: "600", color: "red" }}>Non Halal</Text>
          )}

          <View style={styles.textFlex}>
            <Text>
              Blood:{" "}
              <Text style={{ fontWeight: "800" }}>
                {milkData.userdetail.bloodType}
              </Text>
            </Text>
            <Text>
              Rhesus:{" "}
              <Text style={{ fontWeight: "800" }}>
                {milkData.userdetail.bloodRhesus}
              </Text>
            </Text>
          </View>

          <Text style={{ color: "gray", fontStyle: "italic" }}>
            Pumped on: {milkData.pumpDate.split("T")[0]}
          </Text>
          <View
            style={{ justifyContent: "flex-end", flexDirection: "row", gap: 5 }}
          >
            <Pressable
              onPress={() => setShowDetail(true)}
              style={styles.chatButton}
            >
              <Text style={styles.buttonText}>Detail</Text>
            </Pressable>

            {!isDonor && (
              <Pressable
                onPress={() =>
                  moveToChatRoom(milkData.user._id, milkData.user.name)
                }
                style={styles.chatButton}
              >
                <Text style={styles.buttonText}>Chat</Text>
              </Pressable>
            )}
            {isDonor && milkData.user._id == loggedUserId && (
              <Pressable
                onPress={() => deleteMilk(milkData._id)}
                style={[styles.chatButton, { backgroundColor: "#ff6961" }]}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
      {/* CARD END */}

      {/* MODAL START */}
      {showDetail && (
        <Modal style={styles.modalContainer} transparent={true}>
          <Pressable onPress={() => setShowDetail(false)}>
            <View style={styles.detailModal}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <Text style={styles.cardName}>{milkData.user.name}</Text>
                <Pressable
                  onPress={() => setShowDetail(false)}
                  style={styles.chatButton}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </Pressable>
              </View>

              <View style={{ justifyContent: "space-between", height: "88%" }}>
                {/* PERSONAL DATA */}
                <View>
                  <Text>
                    Baby Gender:{" "}
                    <Text style={{ fontWeight: "800" }}>
                      {milkData.userdetail.babyGender}
                    </Text>
                  </Text>
                  <Text>
                    Baby DOB:{" "}
                    <Text style={{ fontWeight: "800" }}>
                      {milkData.userdetail.babyDOB.split("T")[0]}
                    </Text>
                  </Text>
                  <Text>
                    Mom's Blood Type:{" "}
                    <Text style={{ fontWeight: "800" }}>
                      {milkData.userdetail.bloodType}
                    </Text>
                  </Text>
                  <Text>
                    Mom's Blood Rhesus:{" "}
                    <Text style={{ fontWeight: "800" }}>
                      {milkData.userdetail.bloodRhesus}
                    </Text>
                  </Text>
                </View>

                {/* DIET */}
                <View>
                  <Text style={{ fontWeight: "800" }}>Mom's diet:</Text>
                  <Text>
                    {milkData.userdetail.halal ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}
                    Halal
                  </Text>
                  <Text>
                    {milkData.userdetail.egg ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Egg
                  </Text>
                  <Text>
                    {milkData.userdetail.dairy ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Dairy
                  </Text>
                  <Text>
                    {milkData.userdetail.nuts ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Nuts
                  </Text>
                  <Text>
                    {milkData.userdetail.soy ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Soy
                  </Text>
                  <Text>
                    {milkData.userdetail.seafood ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Seafood
                  </Text>
                  <Text>
                    {milkData.userdetail.flourOrWheat ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Flour or Wheat
                  </Text>
                  <Text>
                    {milkData.userdetail.redMeat ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Red Meat
                  </Text>
                  <Text>
                    {milkData.userdetail.spicyFood ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Spicy Food
                  </Text>
                  <Text>
                    {milkData.userdetail.caffeine ? (
                      <FontAwesome name="check" size={14} color="green" />
                    ) : (
                      <FontAwesome name="remove" size={14} color="red" />
                    )}{" "}
                    Caffeine
                  </Text>
                </View>

                {/* DISCLAIMER */}
                <View>
                  <Text style={styles.disclaimer}>*Details:</Text>
                  <Text style={styles.disclaimer}>
                    <FontAwesome name="check" size={12} color="green" /> What
                    donor mom does consume
                  </Text>
                  <Text style={styles.disclaimer}>
                    <FontAwesome name="remove" size={12} color="red" /> What
                    donor mom does not consume
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        </Modal>
      )}
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
  modalContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  detailModal: {
    backgroundColor: "white",
    shadowColor: "gray",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    borderRadius: 20,
    height: "50%",
    width: "80%",
    padding: 20,
    paddingHorizontal: 30,
    marginVertical: "50%",
    marginHorizontal: "10%",
  },
  disclaimer: {
    fontSize: 12,
    color: "#676767",
  },
});

export default PostCard;
