import React from "react";
import { StyleSheet, View, Text } from "react-native";

const WateringScreen = ({navigation}) => {

  return (
    <View style={styles.screen}>
        <Text>Watering Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1
  },
});

export default WateringScreen;
