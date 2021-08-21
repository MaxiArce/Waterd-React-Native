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
import * as Location from "expo-location";
import { getForecast } from "../../store/actions/weather.actions";
import Colors from "../../constants/colors";

const HomeScreen = ({ navigation }) => {

  //store
  const dispatch = useDispatch();
  const displayName = useSelector((state) => state.auth.displayName);
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
      }else{
        getLocationHandler();
      }
    })();
  }, []);

  //useEffect to update location
  useEffect(() => {
    if (currentLocation) {
      dispatch(getForecast(currentLocation));
    }
  }, [currentLocation]);

  //gets current location
  const getLocationHandler = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: 6,
        timeout: 5000,
      });
      const locationData =  {
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
        width:64,
        paddingEnd: 16,
        alignContent: 'center'
      },
      title: `Hola ${displayName}!`,
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
              <Text style={styles.weatherText}>{currentWeather.temp}°c</Text>
            </View>
          ) : (
            <ActivityIndicator size="small" color={Colors.PRIMARY_DARK} />
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
    flex:1,
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
  },
  weatherIcon: {
    width: 48,
    height: 48,
  },
  weatherText: {
    textAlign: 'center',
    fontFamily: 'jakarta-bold'
  }
});

export default HomeScreen;
