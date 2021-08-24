import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../constants/colors";
import { PLANTS_ICONS } from "../constants/plantsIcons";
import { waterPlant } from "../store/actions/plants.action";
import WateringProgressBar from "../components/WateringProgressBar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PlantWateringCard = ({ item , showDetails }) => {
  
  //get images for the icons using iconId
  const iconImage = PLANTS_ICONS.find((obj) => {
    return obj.id === item.iconId;
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const handleWatering = (item) => {
    const currentDate = new Date();
    dispatch(waterPlant(user,item.refId,currentDate));
  }

  const TouchableComponent =
    Platform.OS === "android" && Platform.version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

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
          progressWidth={Dimensions.get("window").width - 220}
          showDetails={showDetails}
        />
      </View>
      <TouchableComponent
        style={styles.wateringButton}
        onPress={() => {
          handleWatering(item);
        }}
      >
        <MaterialCommunityIcons
          name="watering-can-outline"
          size={24}
          color={Colors.PRIMARY_DARK}
        />
      </TouchableComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: '100%',
    height: 96,
    backgroundColor: Colors.SECONDARY_LIGHT,
    borderRadius: 11,
    marginVertical: 11,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  detailsContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingBottom: 11,
  },
  title: {
    fontSize: 15,
    color: Colors.PRIMARY_DARK,
    fontFamily: "jakarta-bold",
    textTransform: "capitalize",
  },
  wateringButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 11,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default PlantWateringCard;
