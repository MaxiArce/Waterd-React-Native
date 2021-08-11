import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { getForecast } from "../../store/actions/weather.actions";
import Colors from "../../constants/colors";

const HomeScreen = ({ navigation }) => {
  //store
  const dispatch = useDispatch();
  const currentWeather = useSelector((state) => state.weather.current);
  const forecastWeather = useSelector((state) => state.weather.forecastList);

  //saves currentLocation
  const [currentLocation, setCurrentLocation] = useState();

  //ask for location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permisos insuficientes",
          "Necesita dar permisos de localización para obtener el clima",
          [{ text: "Ok" }]
        );
      }
    })();
  }, []);

  //useEffect to update location
  useEffect(() => {
    if (!currentLocation) {
      getLocationHandler();
    } else {
      dispatch(getForecast(currentLocation));
    }
  }, [currentLocation]);

  //gets current location
  const getLocationHandler = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        // accuracy: 6,
        timeout: 5000,
      });
      const locationData = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      setCurrentLocation(locationData);
    } catch (err) {
      Alert.alert(
        "No se pudo obtener la localización para actualizar el clima",
        [{ text: "Ok" }]
      );
    }
  };

  //set the right icon to the navbar
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {
        paddingEnd: 16,
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Weather");
          }}
        >
          {currentWeather ? (
            <View style={styles.weatherContainer}>
              <Image
                style={styles.weatherIcon}
                source={{ uri: currentWeather.icon }}
              />
              <Text>{currentWeather.temp}°c</Text>
            </View>
          ) : (
            <ActivityIndicator />
          )}
        </TouchableOpacity>
      ),
    });
  }, [currentWeather]);

  return <View style={styles.screen}>

  </View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  weatherContainer: {
    flexDirection: 'column',
    alignContent: 'center',
    width: 24,
    height: 24,
  },
  weatherIcon: {
    width: 32,
    height: 24,
  },
});

export default HomeScreen;
