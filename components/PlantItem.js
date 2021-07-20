import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  StyleSheet,
  Image,
  Button
} from "react-native";
import Card from "./Card";
import Colors from "../constants/colors";
 

const PlantItem = ({ item, onSelected, onDelete }) => {

  const TouchableComponent =
    Platform.OS === "android" && Platform.version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  return (
    <TouchableComponent
      onPress={() => {
        onSelected(item)
      }}
    >
      <View>
        <Card>
          <Image style={styles.image} source={item.image} />
          <View style={styles.cardContent}>
            <Text style={styles.cartText}>{item.name}</Text>
            <Text style={styles.cartDescription}>{item.description}</Text>
          </View>
          <View>
            <Button
              style= {styles.button}
              title="X"
              onPress={() => {
                onDelete(item.id);
              }}
            ></Button>
          </View>
        </Card>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
    cardContent: {
        width: "80%",
      },
      image: {
        width: '15%',
      },
      cartText: {
        fontSize: 24,
        width: '100%',
        fontFamily: 'montserrat',
        paddingLeft: 10,
        color: "white",
      },
      cartDescription: {
        fontSize: 18,
        fontFamily: 'montserrat',
        paddingLeft: 10,
        color: Colors.secondary,
      },
      button: {
        width: '5%',
      }
});

export default PlantItem;
