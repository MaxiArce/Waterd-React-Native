import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Alert } from "react-native";
import Colors from "../constants/colors";

const Card = ({ children, style  }) => {
  return (
    <View style={{ ...styles.cardContainer, ...style }}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    maxWidth: "96%",
    marginTop: 20,
    marginHorizontal: "2%",
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default Card;
