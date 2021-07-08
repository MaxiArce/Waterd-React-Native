import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import ListScreen from "./screens/ListScreen";
import ItemDetailsScreen from "./screens/ItemDetailsScreen";
import AppNavigator from "./navigation/AppNavigator";


export default function App() {

  const [showItem, setShowItem ] = useState('');
  const [dataLoaded] = useFonts({
    'montserrat': require('./assets/fonts/Montserrat-Regular.ttf'),
    'montserrat-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf')
  })
  
  // const content = showItem
  // ?<ItemDetailsScreen itemTitle={showItem} showItemSelected ={setShowItem}></ItemDetailsScreen>
  // :<ListScreen showItemSelected ={setShowItem}></ListScreen>

  if (!dataLoaded) {
    return <AppLoading />
  }

  return (
    <View style={styles.container}>
      <AppNavigator></AppNavigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
