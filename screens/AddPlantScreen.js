import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addPlant } from "../store/actions/plants.action";
import Colors from "../constants/colors";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import { Ionicons } from "@expo/vector-icons";

const AddPlantScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //InputText states
  const [inputNameText, setInputNameText] = useState("");
  const [inputDescriptionText, setInputDescriptionText] = useState("");

  //gets user from store
  const user = useSelector((state) => state.auth.user);

  //Triggers when the view is not focused
  const isFocused = useIsFocused();

  useEffect(() => {
    setInputNameText("");
    setInputDescriptionText("");
  }, [isFocused]);

  const handleAddItem = () => {
    if (inputNameText && inputDescriptionText) {
      const payload = {
        name: inputNameText,
        description: inputDescriptionText,
        image:
          "https://firebasestorage.googleapis.com/v0/b/react-native-test-4cb23.appspot.com/o/Plant1.png?alt=media&token=cefc36a6-08bc-4840-9f16-ac096e0d11b0",
      };

      dispatch(addPlant(payload, user));
      navigation.goBack();
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
    marginTop: 16,
    // position: "absolute",
    // bottom: 32,
  },
  image: {
    height: 100,
  },
});

export default AddPlantScreen;
