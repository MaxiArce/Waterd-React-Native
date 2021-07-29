import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import Colors from "../constants/colors";
import Card from "./Card";
import { AntDesign } from '@expo/vector-icons'; 


const PlantItemRow = ({ item, onSelected, onDelete }) => {
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
            source={item.image}
          />
          <View style={styles.cardDetails}>
            <Text style={styles.cartText}>{item.name}</Text>
            <Text style={styles.cartDescription}>{item.description}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={() => {onDelete(item.id)}}>
            <AntDesign name="close" size={24} color={Colors.PRIMARY_DARK} />
          </TouchableOpacity>
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
