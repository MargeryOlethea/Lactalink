import React from "react";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MilkForm } from "../types/all.types";
import Logo from "../components/Logo";

export default function CreateMilkScreen() {
  // HANDLE REGISTER
  const [milkForm, setMilkForm] = useState<MilkForm>({
    totalBag: "",
    totalMl: "",
    pumpDate: "",
  });

  const handleInput = (field: string, value: string): void => {
    setMilkForm({ ...milkForm, [field]: value });
  };
  return (
    <>
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <View style={styles.upperContainer}>
          <Logo size={25} />
          <Text style={styles.title}>Make a new post</Text>
        </View>
        <View style={styles.bottomContainer}>
          {/* BAG */}
          <Text style={styles.label}>Total Bag</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: 10 bags"
            keyboardType="numeric"
          />

          {/* SIZE */}
          <Text style={styles.label}>Total ml/Bag</Text>
          <TextInput
            style={styles.input}
            placeholder="ex: 200 ml"
            keyboardType="numeric"
          />

          {/* PUMP DATE */}
          <Text style={styles.label}>Pump Date</Text>
          <TextInput style={styles.input} placeholder="YYYY-MM-DD" />

          {/* BUTTON */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Create Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  upperContainer: {
    height: "20%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  bottomContainer: {
    backgroundColor: "#8CB9BD",
    paddingHorizontal: 20,
    borderTopEndRadius: 50,
    paddingBottom: 40,
    height: "80%",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 10,
    color: "#1f2937",
  },
  label: {
    marginTop: 30,
    fontWeight: "600",
    color: "white",
  },
  input: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 10,
    marginTop: 5,
    paddingVertical: 15,
    color: "black",
  },
  button: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    paddingVertical: 15,
    borderColor: "white",
    borderWidth: 3,
    marginHorizontal: "auto",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
