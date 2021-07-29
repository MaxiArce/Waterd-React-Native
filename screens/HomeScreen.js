import React from "react";
import { StyleSheet, View, Text } from "react-native";

const HomeScreen = ({navigation}) => {

  return (
    <View style={styles.screen}>
        <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1
  },
});

export default HomeScreen;
