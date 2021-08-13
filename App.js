import React, { useState } from "react";
import { StyleSheet, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MainNavigator from "./navigation";
import { Provider } from "react-redux";
import store from "./store";
import { init } from "./db";

export default function App() {
  init()
    .then(() => console.log("Database initialized"))
    .catch((err) => {
      console.log("Database failed to connect");
      console.log(err.message);
    });

  const [dataLoaded] = useFonts({
    jakarta: require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
    "jakarta-bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
    "canela-bold": require("./assets/fonts/Canela-Bold.ttf"),
  });

  if (!dataLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <StatusBar Platform barStyle="dark-content" backgroundColor='white' hidden={false} translucent={true} />
      <MainNavigator></MainNavigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
