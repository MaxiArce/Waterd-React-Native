import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { addPlant } from "../store/actions/plants.action";
import Colors from "../constants/colors";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const AddPlantScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //Guarda el texto de los inputs
  const [inputNameText, setInputNameText] = useState("");
  const [inputDescriptionText, setInputDescriptionText] = useState("");

  const handleAddItem = () => {
    if (inputNameText && inputDescriptionText) {
      dispatch(
        addPlant({
          id: Math.random().toString(),
          name: inputNameText,
          description: inputDescriptionText,
          image: require("../assets/images/Plant1.png"),
        })
      );
      setInputNameText("");
      setInputDescriptionText("");
      navigation.navigate("MyPlantsList");
    } else {
      Alert.alert("Ingresa un valor!");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <TouchableOpacity
        style={styles.imgContainer}
        onPress={() => {
          Alert.alert("No implementado");
        }}
      >
        <Image
          source={require("../assets/images/Plant3.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.addImgContainer}>
          <Ionicons name="md-camera-outline" size={24} color="white" />
        </View>
      </TouchableOpacity>

      <View style={styles.textInputContainer}>
        <Input
          style={styles.textInput}
          placeholder="Nombre de la planta"
          placeholderTextColor={Colors.TEXT_LIGHT}
          onChangeText={(text) => setInputNameText(text)}
          value={inputNameText}
        />
        <Input
          style={styles.textInput}
          placeholder="Detalles"
          placeholderTextColor={Colors.TEXT_LIGHT}
          onChangeText={(text) => setInputDescriptionText(text)}
          value={inputDescriptionText}
        />
      </View>
      <CustomButton
        style={styles.customButton}
        value="Guardar"
        onPress={handleAddItem}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 150,
    marginVertical: 16,
    borderRadius: 75,
    backgroundColor: Colors.SECONDARY_LIGHT,
  },
  addImgContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    width: 42,
    borderRadius: 24,
    backgroundColor: Colors.PRIMARY_DARK,
  },
  textInputContainer: {
    flexDirection: "column",
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  customButton: {
    marginTop: 16
    // position: "absolute",
    // bottom: 32,
  },
  image: {
    height: 100,
  },
});

export default AddPlantScreen;
