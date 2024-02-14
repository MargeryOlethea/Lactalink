import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from "../components/Logo";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export default function IdRegisterScreen() {
  const [image, setImage] = useState<string>();

  const imagePicker = async () => {
    try {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    try {
      if (!image) {
        alert("No image selected");
        return;
      }

      const formData = new FormData();
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append("image", blob, "id-card");

      //await axios post, form data, headers: content type : multipart/formData
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperContent}>
        <Text style={styles.logo}>LactaLink</Text>
        <Text style={styles.tagline}>
          Moms helping moms, every step of the way.
        </Text>
        <Text style={styles.joinText}>Join our community now!</Text>
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.instruction}>
          Upload your Indonesian ID Card here!
        </Text>
        <TouchableOpacity onPress={() => imagePicker()}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <AntDesign name="pluscircleo" size={70} color="white" />
          )}
        </TouchableOpacity>
        {image && (
          <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.uploadText}>Upload!</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  upperContent: {
    height: "40%",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
  },
  logo: {
    fontWeight: "800",
    fontSize: 24,
    color: "#8CB9BD",
    marginBottom: 7,
  },
  tagline: {
    fontSize: 17,
    color: "#1f2937",
    fontWeight: "500",
  },
  joinText: {
    marginTop: 70,
    marginBottom: 30,
    color: "#1f2937",
  },
  bottomContent: {
    height: "60%",
    backgroundColor: "#8CB9BD",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  instruction: {
    marginBottom: 20,
    color: "#1f2937",
    fontWeight: "600",
  },
  image: {
    height: 100,
    aspectRatio: "9/5",
    borderRadius: 10,
  },
  uploadButton: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
    borderColor: "white",
    borderWidth: 2,
  },
  uploadText: {
    color: "white",
    fontWeight: "800",
  },
});