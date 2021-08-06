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
import Card from "./Card";


const PlantItemRow = ({ item, onSelected }) => {

  
  const TouchableComponent =
    Platform.OS === "android" && Platform.version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <TouchableComponent
      onPress={() => {
        onSelected(item);
      }}
    >
      <Card>
        <View style={styles.contentContainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{uri: item.image}}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cartText}>{item.name}</Text>
            <Text style={styles.cartDescription}>{item.description}</Text>
          </View>
        </View>
      </Card>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: "space-between",
  },
  image: {
    width: 48,
    height: 48,
    paddingVertical: 4,
    backgroundColor: Colors.SECONDARY_LIGHT,
    borderRadius: 24,
  },
  cardDetails: {
    width: 300,
    paddingLeft: 12,
  },
  cartText: {
    fontFamily: "jakarta-bold",
    fontSize: 15,
    color: Colors.TEXT_DARK,
  },
  cartDescription: {
    fontFamily: "jakarta",
    fontSize: 13,
    color: Colors.TEXT_LIGHT,
  },
  deleteButton: {
    width:24,
    height:24,
  }

});

export default PlantItemRow;
