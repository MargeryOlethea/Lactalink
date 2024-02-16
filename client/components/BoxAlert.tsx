import { Alert } from "react-native";

const BoxAlert = (title: string, message: string) =>
  Alert.alert(title, message, [
    {
      text: "Cancel",
      style: "cancel",
    },
    { text: "OK" },
  ]);

export default BoxAlert;
