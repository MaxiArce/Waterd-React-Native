import React, { useState } from "react";
import { View, StyleSheet, Button, Alert, Image } from "react-native";
import { useDispatch } from "react-redux";
import { addPlant } from '../store/actions/plants.action'
import Colors from "../constants/colors";
import Input from "../components/Input";

const AddItemScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  //Guarda el texto de los inputs
  const [inputNameText, setInputNameText] = useState("");
  const [inputDescriptionText, setInputDescriptionText] = useState("");

  const handleAddItem = () => {
    if (inputNameText && inputDescriptionText) {
      dispatch(addPlant(
        {id: Math.random().toString(),
        name: inputNameText,
        description: inputDescriptionText,
        image: require('../assets/images/Plant1.png')}
      ))
      navigation.navigate("Home");
    } else {
      Alert.alert("Ingresa un valor!");
    }
  };

  return (
    <View style={styles.screen}>
      <Image
        source={require("../assets/images/Plant1.png")}
        style={styles.image}
      />
      <View style={styles.textInputContainer}>
        <Input
          style={styles.textInput}
          placeholder="Ingrese el nombre de la planta"
          placeholderTextColor="white"
          onChangeText={(text) => setInputNameText(text)}
          value={inputNameText}
        />
        <Input
          style={styles.textInput}
          placeholder="Ingrese los detalles"
          placeholderTextColor="white"
          onChangeText={(text) => setInputDescriptionText(text)}
          value={inputDescriptionText}
        />
      </View>
      <View style={styles.buttonAdd}>
        <Button
          style={styles.buttonAdd}
          title={"Listo"}
          onPress={() => {
            handleAddItem();
          }}
        ></Button>
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
    flexDirection: "column",
    backgroundColor: Colors.primary,
    padding: 5,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  textInput: {
    flexGrow: 1,
    maxWidth: "100%",
    marginVertical: 10,
    padding: 10,
    fontSize: 20,
    maxHeight: 50,
    borderRadius: 10,
  },
  buttonAdd: {
    marginLeft: 10,
  },
  image: {
    height: 100,
  },
});

export default AddItemScreen;
