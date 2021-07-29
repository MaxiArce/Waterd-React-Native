import React, { Children } from "react";
import { Text,View, StyleSheet, } from "react-native";
import Colors from "../constants/colors";

const Card = ({ children, style  }) => {
  return (
    <View style={{ ...styles.cardContainer, ...style }}>
      {children}
      <View style={styles.divider}/>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "column",
    maxWidth: "100%",
    height: 73 ,
    marginBottom:16
  },
  divider: {
    borderBottomWidth: 0.5,
    marginLeft: 16,
    borderBottomColor: "#00000033"
  }
});

export default Card;
