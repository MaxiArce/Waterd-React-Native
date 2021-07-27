import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import AppNavigator from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import store from "./store";

export default function App() {
  const [showItem, setShowItem] = useState("");
  const [dataLoaded] = useFonts({
    jakarta: require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
    "jakarta-bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
    "canela-bold": require("./assets/fonts/Canela-Bold.ttf")
  });

  if (!dataLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <AppNavigator></AppNavigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
