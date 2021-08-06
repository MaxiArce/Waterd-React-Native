import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Colors from "../constants/colors";

const PlantDetailsCard = ({ item }) => {

  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Image
          style={styles.image}
          source={{ uri: item.image }}
          resizeMode="contain"
        ></Image>
      </View>
      <Text style={styles.descriptionText}>{item.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  headerContainer: {
    width: "100%",
    height: "50%",
    backgroundColor: Colors.SECONDARY_LIGHT,
  },
  title: {
    position: "absolute",
    bottom: 16,
    left: 16,
    fontFamily: "canela-bold",
    fontSize: 34,
    color: Colors.PRIMARY_DARK,
  },
  image: {
    height: "100%",
    zIndex: -1,
  },
  descriptionText: {
    padding: 16,
    fontSize: 18,
    fontFamily: "jakarta",
    color: Colors.TEXT_LIGHT,
  },
});

export default PlantDetailsCard;
