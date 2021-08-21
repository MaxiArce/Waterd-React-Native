import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";

const CustomButton = ({ style,  ...props }) => {

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={{...styles.button,...style}} {...props}>
        <Text style={{...styles.buttonText,...style}}>{props.value}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    backgroundColor: 'transparent'
  },
  button: {
    margin: 16,
    paddingHorizontal: 16,
    height: 56,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: Colors.PRIMARY_DARK,
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
