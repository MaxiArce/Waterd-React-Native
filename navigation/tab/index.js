import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  Platform
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { updateSQL } from "../../db";
import { loadPlants } from "../../store/actions/plants.action";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../../constants/colors";

import HomeScreen from "../home";
import MyPlantsScreen from "../myplants";
import AddPlantScreen from "../addplant";
import WateringScreen from "../watering";
import ProfileScreen from "../profile";

import MyPlantsIcon from "../../assets/icons/myplantsicon";
import WateringIcon from "../../assets/icons/wateringicon";
import AddPlantIcon from "../../assets/icons/addplanticon";
import HomeIcon from "../../assets/icons/homeicon";
import ProfileIcon from "../../assets/icons/profileicon";

const TabStack = createBottomTabNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [isDBUpdated, setIsDBUpdated] = useState(false);

  // Updates DB if the the user is loggedIn
  useEffect(() => {
    updateSQL(user).then(() => {
      dispatch(loadPlants());
      setIsDBUpdated(true);
    });
  }, []);

  return (
    <>
      {isDBUpdated ? (
        <TabStack.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            showLabel: false,
            style: {
              ...styles.tabBar,
            },
          }}
        >
          <TabStack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <View style={styles.item}>
                    <HomeIcon />
                    <View style={styles.active}></View>
                  </View>
                ) : (
                  <View style={styles.item}>
                    <HomeIcon />
                  </View>
                ),
            }}
          />
          <TabStack.Screen
            name="MyPlants"
            component={MyPlantsScreen}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <View style={styles.item}>
                    <MyPlantsIcon />
                    <View style={styles.active}></View>
                  </View>
                ) : (
                  <View style={styles.item}>
                    <MyPlantsIcon />
                  </View>
                ),
            }}
          />
          <TabStack.Screen
            name="AddPlant"
            component={AddPlantScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={styles.item}>
                  <AddPlantIcon />
                </View>
              ),
              unmountOnBlur: true,
              tabBarVisible: false,
            }}
          />
          <TabStack.Screen
            name="Watering"
            component={WateringScreen}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <View style={styles.item}>
                    <WateringIcon />
                    <View style={styles.active}></View>
                  </View>
                ) : (
                  <View style={styles.item}>
                    <WateringIcon />
                  </View>
                ),
            }}
          />
          <TabStack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <View style={styles.item}>
                    <ProfileIcon />
                    <View style={styles.active}></View>
                  </View>
                ) : (
                  <View style={styles.item}>
                    <ProfileIcon />
                  </View>
                ),
            }}
          />
        </TabStack.Navigator>
      ) : (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" color={Colors.PRIMARY_DARK} />
          <Text style={styles.loadingScreenText}>Actualizando...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: (Platform.OS === 'ios') ? (Dimensions.get('window').height) / 10 : Dimensions.get('window').height / 12
  },
  item: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    marginTop: 2,
    borderRadius: 1,
    width: "25%",
    borderBottomWidth: 3,
    borderBottomColor: Colors.PRIMARY_LIGHT,
  },
  loadingScreen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingScreenText: {
    fontFamily: "jakarta-bold",
    fontSize: 15,
    color: Colors.PRIMARY_DARK,
  },
});

export default TabNavigator;
