import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import PicturePicker from "../../components/PicturePicker";
import Colors from "../../constants/colors";
import CustomButton from "../../components/CustomButton";

const PickPlantImageScreen = ({ navigation }) => {
  
  //keep both images 
  const [leafImage, setLeafImage] = useState();
  const [flowerImage, setFlowerImage] = useState();

  //navigates to identifyPlantScreen when both photos are selected
  useEffect(() => {
    if (leafImage && flowerImage) {
      navigation.push("IdentifyPlant", { leafImage, flowerImage });
    }
  }, [leafImage, flowerImage]);

  //Clears states when screen is not focused
  const isFocused = useIsFocused();

  useEffect(() => {
    setLeafImage("");
    setFlowerImage("");
  }, [isFocused]);

  return (
    <View style={styles.screen}>
      {!leafImage ? (
        <>
          <Text style={styles.title}>
            Comencemos con una foto de las hojas de tu planta!
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/images/LeafPhoto.png")}
          />
          <View style={styles.buttonContainer}>
            <PicturePicker
              style={styles.photoPicker}
              onImageSelected={setLeafImage}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>
            Si tu planta tiene flores necesitaremos una foto
          </Text>
          <Image
            style={styles.image}
            source={require("../../assets/images/FlowerPhoto.png")}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              value={"Saltar"}
              style={styles.button}
              onPress={() => {
                navigation.navigate("IdentifyPlant", { leafImage: leafImage });
              }}
            />
            <PicturePicker
              style={styles.photoPicker}
              onImageSelected={setFlowerImage}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 11,
    paddingHorizontal: 16,
    color: Colors.PRIMARY_DARK,
    fontFamily: "jakarta-bold",
    textAlign: "center",
    fontSize: 24,
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    marginTop: 11,
    maxHeight: 400,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  button: {
    marginBottom: 0,
    backgroundColor: "white",
    color: Colors.PRIMARY_DARK,
  },
});

export default PickPlantImageScreen;
