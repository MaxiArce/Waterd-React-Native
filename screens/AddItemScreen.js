import React, { useState } from "react";
import { View, StyleSheet, Button, Alert } from "react-native";

import Colors from "../constants/colors";
import Input from "../components/Input";



const AddItemScreen = ({ navigation }) => {

//Guarda el texto del input
const [inputText, setInputText] = useState("");

const AddItem = () => {
  if (inputText) {
    navigation.navigate("Home", {
      itemName : inputText,
    });
  } else {
    Alert.alert("Ingresa un valor!");
  }
};


  return (
    <View style={styles.screen}>
      <View style={styles.textInputContainer}>
        <Input
          style={styles.textInput}
          placeholder="Ingrese el nombre"
          onChangeText={(text) => setInputText(text)}
          value={inputText}
        />
        <View style={styles.buttonAdd}>
          <Button
            style={styles.buttonAdd}
            title={"Listo"}
            onPress={() => {
              AddItem()
            }}
          ></Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    padding: 5,
    width: "100%",
    height: 60,
    alignContent: "center",
    justifyContent: "center",
  },
  textInput: {
    flexGrow: 1,
    maxWidth: "100%",
    paddingHorizontal: 10,
    fontSize: 20,
    maxHeight: 36,
    borderRadius: 10,
  },
  buttonAdd: {
    marginLeft: 10,
  },
});

export default AddItemScreen;
