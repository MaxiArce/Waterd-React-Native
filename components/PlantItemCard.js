import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import Colors from "../constants/colors";
import { PLANTS_ICONS } from "../constants/plantsIcons";

const PlantItemCard = ({ item, onSelected }) => {
  const iconImage = PLANTS_ICONS.find((obj) => {
    return obj.id === item.iconId;
  });

  const TouchableComponent =
    Platform.OS === "android" && Platform.version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onSelected(item);
        }}
      >
        <Image
          style={styles.image}
          resizeMode="contain"
          source={(source = iconImage.image)}
        />
        <View style={styles.cardDetails}>
          <Text style={styles.cartText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
    marginVertical: 11,
    flexDirection: "column",
    width: "47%",
    padding: 11,
    backgroundColor: Colors.SECONDARY_LIGHT,
    borderRadius: 11,
  },
  image: {
    width: "100%",
    height: 150,
    paddingVertical: 4,
  },
  cartText: {
    fontFamily: "jakarta-bold",
    fontSize: 15,
    textAlign: "center",
    marginTop: 11,
    textTransform: "capitalize",
    color: Colors.PRIMARY_DARK,
  },
});

export default PlantItemCard;
