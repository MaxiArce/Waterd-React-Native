import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Colors from "../constants/colors";

const TypeOfPlantPicker = ({onSelected}) => {

  const [isExteriorPlant, setIsExteriorPlant] = useState(false);

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          if (isExteriorPlant === true) {
            setIsExteriorPlant(false);
            onSelected(false)
          }
        }}
      >
        <View
          style={
            !isExteriorPlant
              ? styles.optionIconContainerSelected
              : styles.optionIconContainer
          }
        >
          <Image
            source={require("../assets/images/InteriorPlant.png")}
            style={styles.optionImage}
          />
        </View>
        <BouncyCheckbox
          size={25}
          fillColor={Colors.PRIMARY_LIGHT}
          unfillColor="white"
          borderColor="red"
          text="Interior"
          textStyle={{
            textDecorationLine: "none",
            color: Colors.PRIMARY_DARK,
            fontFamily: "jakarta",
          }}
          disableBuiltInState
          isChecked={!isExteriorPlant}
          iconStyle={{ borderColor: Colors.PRIMARY_LIGHT }}
          onPress={() => {
            if (isExteriorPlant === true) {
              setIsExteriorPlant(false);
              onSelected(false)
            }
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.option}
        onPress={() => {
          if (isExteriorPlant === false) {
            setIsExteriorPlant(true);
            onSelected(true)
          }
        }}
      >
        <View
          style={
            isExteriorPlant
              ? styles.optionIconContainerSelected
              : styles.optionIconContainer
          }
        >
          <Image
            source={require("../assets/images/ExteriorPlant.png")}
            style={styles.optionImage}
          />
        </View>
        <BouncyCheckbox
          size={25}
          fillColor={Colors.PRIMARY_LIGHT}
          unfillColor="white"
          text="Exterior"
          textStyle={{
            textDecorationLine: "none",
            color: Colors.PRIMARY_DARK,

            fontFamily: "jakarta",
          }}
          disableBuiltInState
          isChecked={isExteriorPlant}
          iconStyle={{ borderColor: Colors.PRIMARY_LIGHT }}
          onPress={() => {
            if (isExteriorPlant === false) {
              setIsExteriorPlant(true);
              onSelected(true)
            }
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    width: "100%",
    height: 176,
    marginBottom: 33,
  },
  option: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: 121,
    height: 176,
  },
  optionIconContainer: {
    width: 121,
    height: 143,
    backgroundColor: "white",
    // borderWidth: 2,
    // borderColor: Colors.SECONDARY_DARK,
    borderRadius: 20,
    overflow: "hidden",
  },
  optionIconContainerSelected: {
    width: 121,
    height: 143,
    backgroundColor: Colors.SECONDARY_LIGHT,
    borderWidth: 2,
    borderColor: Colors.SECONDARY_DARK,
    borderRadius: 20,
    overflow: "hidden",
  },
  optionImage: {
    width: 121,
    height: 143,

    resizeMode: "cover",
  },
});

export default TypeOfPlantPicker;
