import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/colors";

const WeatherWidget = ({ navigation }) => {
  const currentWeather = useSelector((state) => state.weather.current);

  let weatherComment = "";

  //sets the comment about the weather
  if (currentWeather) {
    if (
      currentWeather.main === "Thunderstorm" ||
      currentWeather.main === "Drizzle" ||
      currentWeather.main === "Snow" ||
      currentWeather.main === "Rain"
    ) {
      weatherComment =
        "Debido al clima actrual puede que algunas de tus plantas de exterior ya estén regadas.";
    } else {
      weatherComment =
        "Puede que alguna de tus plantas necesiten más riego de lo normal.";
    }
  }

  return (
    <View style={styles.weatherContainer}>
      {currentWeather ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Weather");
          }}
        >
          <ImageBackground
            source={require("../assets/images/WeatherBackground.png")}
            style={styles.weatherContentContainer}
          >
            <View style={styles.weatherIconContainer}>
              <Text style={styles.weatherTempText}>
                {currentWeather.temp}°c
              </Text>
              <Image
                style={styles.weatherIcon}
                source={{ uri: currentWeather.icon }}
              />
            </View>
            <Text style={styles.weatherDescription}>
              {currentWeather.description}
            </Text>
          </ImageBackground>
          <Text style={styles.weatherComment}>{weatherComment}</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="small" color={Colors.PRIMARY_DARK} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    padding: 11,
    borderRadius: 11,
    backgroundColor: Colors.SECONDARY_LIGHT,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  weatherContentContainer: {
    flexDirection: "column",
    width: "100%",
    height: 170,
    alignItems: "center",
  },
  weatherIconContainer: {
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignItems: "center",
  },
  weatherIcon: {
    width: 48,
    height: 48,
  },
  weatherTempText: {
    fontSize: 19,
    textAlign: "justify",
    fontFamily: "jakarta-bold",
  },
  weatherDescription: {
    fontFamily: "jakarta-bold",
    position: "absolute",
    top: "50%",
    fontSize: 19,
    textTransform: "capitalize",
  },
  weatherComment: {
    fontFamily: "jakarta-bold",
    fontSize: 15,
    marginTop: 5,
    color: Colors.TEXT_DARK,
  },
});

export default WeatherWidget;
