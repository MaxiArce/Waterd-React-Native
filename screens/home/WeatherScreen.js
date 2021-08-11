import React from "react";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../../constants/colors";
import WeatherDetailsRow from "../../components/WeatherDetailsRow";

const WeatherScreen = ({ navigation }) => {
  const currentWeather = useSelector((state) => state.weather.current);
  const forecast = useSelector((state) => state.weather.forecastList);

  const renderItem = ({ item }) => (
    <WeatherDetailsRow  item={item} />
  );

  return (
    <View style={styles.screen}>
      {/* Current Weather Container */}
      <View style={styles.currentWeatherContainer}>
        <Image
          style={styles.currentWeatherImg}
          source={{ uri: currentWeather.icon }}
        />
        <Text style={styles.tempText}>{currentWeather.temp}°c</Text>
        <Text style={styles.descriptionText}>{currentWeather.description}</Text>
      </View>
      {/* Forecast Container */}
      <View style={styles.forecastContainer}>
        <FlatList
          style={styles.forecastContainer}
          data={forecast}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.PRIMARY_DARK,
  },
  currentWeatherContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  currentWeatherImg: {
    width: 128,
    height: 128,
  },
  tempText: {
    color: "white",
    fontFamily: "jakarta-bold",
    fontSize: 48,
  },
  descriptionText: {
    color: "white",
    fontFamily: "jakarta",
    fontSize: 24,
    textTransform: "capitalize",
  },
  forecastContainer: {
    flexDirection: "column",
    marginTop: 22,
    width: "100%",
  },
});

export default WeatherScreen;
