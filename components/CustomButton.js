import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";

const CustomButton = ({ style, ...props }) => {
  return (
    <View style={{ ...styles.buttonContainer, ...style }}>
      <TouchableOpacity style={styles.button} {...props}>
        <Text style={styles.buttonText}>{props.value}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
  },
  button: {
    margin: 16,
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY_DARK,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "jakarta-bold",
    fontSize: 17,
    color: "white",
    width: "100%",
  },
});

export default CustomButton;
