import React, { useEffect, useState, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import Colors from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "../../components/CustomButton";
import mime from "mime";

const IdentifyingPlant = ({ navigation, route }) => {
	
	//images
  const leafImage = route.params.leafImage;
  const flowerImage = route.params.leafImage;

	//states to show the status of fetch
  const [statusText, setStatusText] = useState("Identificando tu planta...");
  const [statusIcon, setStatusIcon] = useState("isFetching");

	//response from api
  const [identifiedPlant, setIdentifiedPlant] = useState();

  useEffect(() => {
    fetchPlantName();
  }, []);

	//set status
  useEffect(() => {
    if (identifiedPlant) {
      if (identifiedPlant.score > 0.8) {
        setStatusText(
          `Estamos seguros que tu planta es una ${identifiedPlant.species.commonNames[0]}`
        );
      } else {
        setStatusText(
          `Quizas tu planta es una ${identifiedPlant.species.commonNames[0]}`
        );
      }
    }
  }, [identifiedPlant]);


	//fetch info from api
  const fetchPlantName = async () => {
    const endPoint =
      "https://my-api.plantnet.org/v2/identify/all?api-key=2b10s6uZBUuIK6rG0L2QHscQe";

    const leafImg = {
      uri: leafImage.uri,
      type: mime.getType(leafImage.uri),
      name: leafImage.uri.substr(leafImage.uri.lastIndexOf("/") + 1),
    };

    let formdata = new FormData();
    formdata.append("organs", "leaf");
    formdata.append("images", leafImg);

    if (flowerImage) {
      const flowerImg = {
        uri: leafImage.uri,
        type: mime.getType(leafImage.uri),
        name: leafImage.uri.substr(leafImage.uri.lastIndexOf("/") + 1),
      };
      formdata.append("organs", "flower");
      formdata.append("images", flowerImg);
    }

    try {
      const response = await fetch(endPoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formdata,
      });
      const resData = await response.json();
      if (resData.results) {
        setIdentifiedPlant(resData.results[0]);
        setStatusIcon("success");
      } else {
        setStatusText(
          "No Pudimos encontrar tu planta , intenta nuevamente con otras fotos"
        );
        setStatusIcon("fail");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image
          style={{ width: 300, height: 300 }}
          source={{ uri: leafImage.uri }}
        />
      </View>
      <Text style={styles.title}>{statusText}</Text>
      <View style={styles.statusIconContainer}>
        {statusIcon === "isFetching" && (
          <>
            <ActivityIndicator size="large" color={"white"} />
            <CustomButton value={"Cancelar"} style={styles.buttonCancel} onPress={()=>{navigation.navigate("PickPlantImage")}} />
          </>
        )}
        {statusIcon === "success" && (
          <>
            <AntDesign
							style={styles.icon}
              name="checkcircleo"
              size={48}
              color={Colors.PRIMARY_LIGHT}
            />
              <CustomButton value={"Continuar"} style={styles.button} onPress={() => {navigation.push('AddPlant',identifiedPlant )}}/>
          </>
        )}
        {statusIcon === "fail" && (
          <>
            <AntDesign name="exclamationcircleo" size={48} color={Colors.WARNING} />
            <CustomButton value={"Reintentar"} style={styles.button} onPress={()=>{navigation.navigate("PickPlantImage")}}/>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    alignContent: "center",
		justifyContent: 'space-between',
    width: "100%",
    height: "100%",
    backgroundColor: Colors.PRIMARY_DARK,
  },
  title: {
    marginBottom: 22,
    marginHorizontal: 16,
    color: "white",
    fontFamily: "jakarta-bold",
    textAlign: "center",
    fontSize: 24,
  },
  imageContainer: {
    alignSelf: "center",
    marginVertical: 11,
    width: 300,
    height: 300,
    borderRadius: 150,
    overflow: "hidden",
  },
  statusIconContainer: {
    width: "100%",
    alignItems: "center",
  },
	icon: {
		marginBottom:22
	},
  button: {
		backgroundColor: 'white',
    color: Colors.PRIMARY_DARK,
  },
	buttonCancel :{
		backgroundColor: Colors.WARNING,
    color: 'white'
	}
});

export default IdentifyingPlant;
