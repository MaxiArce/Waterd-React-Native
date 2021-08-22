import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Image,
  Dimensions
} from "react-native";
import Colors from "../constants/colors";
import { PLANTS_ICONS } from "../data/plantsIcons";
import WateringProgressBar from '../components/WateringProgressBar'
import { MaterialCommunityIcons } from "@expo/vector-icons";

//get images for the icons using iconId
const PlantWateringCard = ({ item, onSelected }) => {

  const iconImage = PLANTS_ICONS.find((obj) => {
    return obj.id === item.iconId;
  });


  const TouchableComponent = (
    Platform.OS === "android" && Platform.version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity);
 

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={iconImage.image} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <WateringProgressBar         
        wateringDays={item.wateringDays} 
        wateringTimeStamp={item.wateringTimeStamp} 
        progressWidth={Dimensions.get("window").width-220}
        showDetails= {false}/>
      </View>
      <TouchableComponent style={styles.wateringButton} onPress={()=>{onSelected(item)}}>
        <MaterialCommunityIcons name="watering-can-outline" size={24} color={Colors.PRIMARY_DARK} />
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 96,
    backgroundColor: Colors.SECONDARY_LIGHT,
    borderRadius: 11,
    marginBottom: 22,
    justifyContent: 'space-between'
  },
  imageContainer: {
    height: 96,
    width: 80,
    paddingVertical: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  detailsContainer:{
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 11
  },
  title:{
    fontSize: 15,
    color: Colors.PRIMARY_DARK,
    fontFamily: 'jakarta-bold',
    textTransform: 'capitalize'
  },
  wateringButton:{
    width:48,
    height:48,
    borderRadius: 24,
    marginRight: 11,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"white"
  }
});

export default PlantWateringCard;
