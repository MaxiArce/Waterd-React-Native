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
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
    "montserrat-semibold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
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
