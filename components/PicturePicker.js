import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import ActionSheet from "@alessiocancian/react-native-actionsheet";
import Colors from "../constants/colors";
import CustomButton from "./CustomButton";

const PicturePicker = ({ onImageSelected }) => {
  //ActionSheet
  const actionSheetOptions = ["Take Photo", "Choose Photo", "Cancel"];
  const actionSheet = useRef();
  const showActionSheet = () => {
    actionSheet.current.show();
  };

  const handleTakePhoto = async () => {
    const { status } = await Camera.requestPermissionsAsync();

    if (status === "granted") {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!image.cancelled) {
        onImageSelected(image);
      }
    }

    if (status !== "granted") {
      Alert.alert(
        "Insufficient permits",
        "You need to give permissions to use the camera to use this function.",
        [{ text: "Ok" }]
      );
    }
  };

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === "granted") {
      let image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!image.cancelled) {
        onImageSelected(image);
      }
    }
    if (status !== "granted") {
      Alert.alert(
        "Insufficient permits",
        "You need to give gallery permissions to use this feature."
        [{ text: "Ok" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <ActionSheet
        ref={actionSheet}
        options={actionSheetOptions}
        cancelButtonIndex={2}
        destructiveButtonIndex={3}
        onPress={(index) => {
          if (index === 0) {
            handleTakePhoto();
          }
          if (index === 1) {
            handlePickImage();
          }
        }}
      />
      <CustomButton
        style={styles.customButton}
        value={"Take photo"}
        onPress={showActionSheet}
      ></CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: '100%'
  },
});

export default PicturePicker;
