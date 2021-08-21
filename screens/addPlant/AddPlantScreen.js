import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text, ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addPlant } from "../../store/actions/plants.action";
import IconPicker from "../../components/IconPicker";
import TypeOfPlantPicker from "../../components/TypeOfPlantPicker";
import WateringDaysPicker from "../../components/WateringDaysPicker";
import Input from "../../components/Input";
import Colors from "../../constants/colors";
import CustomButton from "../../components/CustomButton";

const AddPlantScreen = ({ navigation, route }) => {
  const identifiedPlant = route.params;

  const dispatch = useDispatch();

  //InputText states
  const [inputNameText, setInputNameText] = useState(
    identifiedPlant.species.commonNames[0]
  );
  const [selectedIcon, setSelectedIcon] = useState();
  const [isExteriorPlant, setIsExteriorPlant] = useState(false);
  const [wateringDays, setWateringDays] = useState(1);

  //gets user from store
  const user = useSelector((state) => state.auth.user);

  const handleAddItem = () => {
    if (inputNameText && selectedIcon && wateringDays) {

      const payload = {
        name: inputNameText,
        iconId: selectedIcon,
        isExteriorPlant: isExteriorPlant,
        wateringDays: wateringDays,
        wateringTimeStamp: ""
      };

      dispatch(addPlant(payload, user));
      navigation.navigate("MyPlants");
    } else {
      Alert.alert("Completa todos los valores!");
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Nombre de tu planta</Text>
        <Input
          style={styles.input}
          placeholder={"Nombre"}
          value={inputNameText}
          onChangeText={(value) => {
            setInputNameText(value);
          }}
        />
        <Text style={styles.sectionTitle}>Selecciona un icono</Text>
        <IconPicker onSelectedIcon={setSelectedIcon} />
        <Text style={styles.sectionTitle}>Planta de interior o exterior?</Text>
        <TypeOfPlantPicker onSelected={setIsExteriorPlant} />
        <Text style={styles.sectionTitle}>
          Cada cuanto debes regar tu planta?
        </Text>
        <WateringDaysPicker onSelected={setWateringDays} />
        <CustomButton
          value={"Guardar"}
          onPress={() => {
            handleAddItem();
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 16,
  },
  container: {},
  input: {
    textTransform: "capitalize",
  },
  sectionTitle: {
    alignSelf: "center",
    paddingVertical: 11,
    marginVertical: 22,
    fontSize: 19,
    fontFamily: "jakarta-bold",
    color: Colors.PRIMARY_DARK,
  },
});

export default AddPlantScreen;
