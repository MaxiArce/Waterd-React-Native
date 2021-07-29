import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MainNavigator from './navigation';
import { Provider } from "react-redux";
import store from "./store";

export default function App() {

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
      <MainNavigator></MainNavigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
