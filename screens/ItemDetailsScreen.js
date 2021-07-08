import React, { useState } from "react";
import { View, StyleSheet, Image, Text, Button } from "react-native";
import Colors from "../constants/colors";
import Card from "../components/Card";

const ItemDetailsScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/bigleaf.png")}
        />
        <Text style={styles.descriptionText}>Description Test</Text>
        <View style={styles.backButtton}>
          <Button
            title={"Volver"}
            onPress={() => {
              navigation.navigate("Home");
            }}
          ></Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  cardContainer: {
    minWidth: "100%",
    alignItems: "center",
    minHeight: "80%",
    flexDirection: "column",
  },
  image: {
    margin: 20,
  },
  descriptionText: {
    fontSize: 24,
    fontFamily: "montserrat",
    color: "white",
  },
  backButtton: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20,
  },
});

export default ItemDetailsScreen;
