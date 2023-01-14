import React, { useLayoutEffect, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Text,
  Image,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as Location from "expo-location";
import { getForecast } from "../../store/actions/weather.actions";
import Colors from "../../constants/colors";
import WeatherWidget from "../../components/WeatherWidget";
import PlantsStatusWidget from "../../components/PlantsStatusWidget";
import { loadPlants } from "../../store/actions/plants.action";

const HomeScreen = ({ navigation }) => {
  //store
  const dispatch = useDispatch();
  const displayName = useSelector((state) => state.auth.displayName);
  const plants = useSelector((state) => state.plants.list);

  //set the title with the username
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Hi ${displayName}!`,
    });
  }, []);

  //saves currentLocation
  const [currentLocation, setCurrentLocation] = useState();

  //ask for location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Insufficient permits",
          "Need to give location permissions to get weather",
          [{ text: "Ok" }]
        );
      } else {
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
      const locationData = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      setCurrentLocation(locationData);
    } catch (err) {
      Alert.alert(
        "Unable to obtain location to update weather."
        [{ text: "Ok" }]
      );
    }
  };

  //array with plants that need attention
  const [needAttentionList, setNeedAttentionList] = useState([]);

  //filter array of plants to get the ones that have 0 days to be watered
  useEffect(() => {
    const itemList = plants.filter((item) => {
      if (item.wateringTimeStamp) {
        const currentDate = new Date();
        const lastWateringDate = new Date(item.wateringTimeStamp);
        const dif = (currentDate - lastWateringDate) / (1000 * 3600 * 24);
        if (dif > item.wateringDays) {
          console.log(dif);
          return item;
        }
      } else if (item.wateringTimeStamp === "") {
        return item;
      }
    });
    setNeedAttentionList(itemList);
  }, [plants]);

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Weather conditions</Text>
        <WeatherWidget navigation={navigation} />
        <Text style={{ ...styles.sectionTitle, marginTop: 33 }}>
          Condition of your plants
        </Text>
        <PlantsStatusWidget needAttentionList={needAttentionList} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 49
  },
  sectionTitle: {
    fontFamily: "jakarta-bold",
    color: Colors.TEXT_LIGHT,
    marginVertical: 11,
  },
});

export default HomeScreen;
