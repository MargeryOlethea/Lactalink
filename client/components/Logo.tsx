import { Text, View } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function Logo({
  size,
  color,
}: {
  size?: number;
  color?: string;
}) {
  const [fontsLoaded, fontError] = useFonts({
    Courgette: require("../assets/fonts/Courgette/Courgette-Regular.ttf"),
    SundayMorning: require("../assets/fonts/sunday_morning_10/SundayMorning.ttf"),
    BrittanicLondon: require("../assets/fonts/BrittanicLondon.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Text
        style={{
          fontFamily: "Courgette",
          fontWeight: "800",
          fontSize: size ? size : 20,
          color: color ? color : "#8CB9BD",
          paddingLeft: 5,
          paddingTop: 1,
        }}
      >
        Lactalink
      </Text>
    </View>
  );
}
