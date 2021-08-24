import React from "react";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import MainNavigator from "./navigation";
import { Provider } from "react-redux";
import store from "./store";
import { init } from "./db";


export default function App() {

  //Initialize Database 
  init()
    .then(() => console.log("Database Init"))
    .catch((err) => {
      console.log("Database failed to connect");
      console.log(err.message);
    });

  //Load local fonts
  const [dataLoaded] = useFonts({
    jakarta: require("./assets/fonts/PlusJakartaSans-Regular.ttf"),
    "jakarta-bold": require("./assets/fonts/PlusJakartaSans-Bold.ttf"),
    "canela-bold": require("./assets/fonts/Canela-Bold.ttf"),
  });

  //shows AppLoading if data is not yet loaded
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
