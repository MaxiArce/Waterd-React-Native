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
import { PLANTS_ICONS } from "../data/plantsIcons";


const PlantItemCard = ({ item, onSelected }) => {

  const iconImage = PLANTS_ICONS.find(obj => {
      return obj.id === item.iconId
  })
  
  const TouchableComponent =
    Platform.OS === "android" && Platform.version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <TouchableComponent style={styles.container}
      onPress={() => {
        onSelected(item);
      }}
    >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={source=iconImage.image}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cartText}>{item.name}</Text>
        </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: '48%',
    marginBottom: 22,
    padding:11,
    overflow: 'hidden',
    backgroundColor: Colors.SECONDARY_LIGHT,
    borderRadius:11
  },
  image: {
    width: '100%',
    height: 150,
    paddingVertical: 4,
    borderRadius: 24,
  },
  cartText: {
    fontFamily: "jakarta-bold",
    fontSize: 15,
    textAlign: 'center',
    marginTop: 11,
    textTransform: 'capitalize',
    color: Colors.PRIMARY_DARK,
  },

});

export default PlantItemCard;
