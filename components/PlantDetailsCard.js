import React from "react";
import { StyleSheet, View, Text, Image,Dimensions, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";
import { PLANTS_ICONS } from "../data/plantsIcons";
import WateringProgressBar from "../components/WateringProgressBar";
import { Ionicons } from "@expo/vector-icons";

const PlantDetailsCard = ({ item ,navigation}) => {

  //get image from iconID
  const iconImage = PLANTS_ICONS.find((obj) => {
    return obj.id === item.iconId;
  });

  //check if plants is a interior or exterior plant
  let isExteriorPlant = false
  if(item.isExteriorPlant === "1.0" || item.isExteriorPlant === "1")
  {isExteriorPlant= true}

  
  return (
    <View style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Image
          style={styles.image}
          source={iconImage.image}
          resizeMode="contain"
        ></Image>
      </View>

      <View style={styles.isExteriorPlantContainer}>
        <Ionicons name="location-outline" style={styles.isExteriorPlantIcon} size={24} color={Colors.PRIMARY_DARK} />
        <Text style={styles.isExteriorPlantText}>{isExteriorPlant ? "Exterior": "Interior"}</Text>
      </View>
      <TouchableOpacity style={styles.wateringStatusContainer} onPress={()=>(navigation.navigate("Watering"))}>
        <WateringProgressBar 
        wateringDays={item.wateringDays} 
        wateringTimeStamp={item.wateringTimeStamp} 
        progressWidth={Dimensions.get("window").width-96}
        showDetails= {true}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    backgroundColor: Colors.SECONDARY_LIGHT,
  },
  headerContainer: {
    width: "100%",
    height: "50%",
    marginBottom:11,
    backgroundColor: Colors.SECONDARY_LIGHT,
  },
  title: {
    position: "absolute",
    bottom: 0,
    left: 16,
    fontFamily: "canela-bold",
    fontSize: 34,
    color: Colors.PRIMARY_DARK,
    textTransform: 'capitalize'
  },
  image: {
    height: "100%",
    zIndex: -1,
  },
  isExteriorPlantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    width: 150,
    marginBottom:11,
    marginHorizontal: 16,
    borderRadius: 11,
    backgroundColor: "white"
  },
  isExteriorPlantIcon:{
    paddingHorizontal:10
  },
  isExteriorPlantText:{
    fontSize:17,
    fontFamily: 'jakarta-bold',
    color: Colors.PRIMARY_DARK
  },
  wateringStatusContainer:{
    paddingVertical:11,
    marginBottom:11,
    marginHorizontal: 16,
    borderRadius: 11,
    backgroundColor: "white"
  },
});

export default PlantDetailsCard;
