import React from "react";
import { StyleSheet, View } from "react-native";
import StatusBarPlaceHolder from "./components/StatusBar";
import Header from "./components/Headers";
import ListScreen from "./screens/ListScreen";


export default function App() {
  return (
    //Main Screen
    <View style={styles.container}>
      <StatusBarPlaceHolder></StatusBarPlaceHolder>
      <Header title="Titulo"></Header>
      <ListScreen></ListScreen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
