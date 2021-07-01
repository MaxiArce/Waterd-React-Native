import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import StatusBarPlaceHolder from "./components/StatusBar";
import ListScreen from "./screens/ListScreen";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";


export default function App() {

  const [showItem, setShowItem ] = useState('');
  const [dataLoaded] = useFonts({
    'roboto': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf')
  })
  const content = showItem
  ?<ItemDetailsScreen itemTitle={showItem} showItemSelected ={setShowItem}></ItemDetailsScreen>
  :<ListScreen showItemSelected ={setShowItem}></ListScreen>

  if (!dataLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}>
      <StatusBarPlaceHolder></StatusBarPlaceHolder>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
