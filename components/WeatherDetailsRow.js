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

const WeatherDetailsRow = ({ item }) => {
  const TouchableComponent =
    Platform.OS === "android" && Platform.version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;

  //translate date into day 
  const date = new Date(item.id * 1000);
  const days = ['Sunday', 'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const day = days[date.getDay()]

  return (
    <TouchableComponent style={styles.contentContainer}>
      <Text style={styles.day}>{day}</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.temp}>{item.minTemp} / {item.maxTemp}</Text>
        <Image
          style={styles.icon}
          source={{ uri: item.iconUrl }}
        />
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: "row",
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 8,
    paddingTop: 8,
    alignContent: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomColor: "white",
    borderTopColor: "white",
  },
  day: {
    fontFamily: "jakarta",
    color: "white",
    fontSize: 19,
    textTransform: "capitalize",
  },
  temp: {
    fontFamily: "jakarta",
    color: "white",
    fontSize: 19,
  },
  icon: {
    width: 32,
    height: 32,
  },
});

export default WeatherDetailsRow;
