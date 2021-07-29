import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Colors from "../../constants/colors";

import MyPlantsScreen from "../myplants";

import MyPlantsIcon from "../../assets/icons/myplantsicon";
import WateringIcon from "../../assets/icons/wateringicon";
import AddPlantIcon from "../../assets/icons/addplanticon";
import HomeIcon from "../../assets/icons/homeicon";
import ProfileIcon from "../../assets/icons/profileicon";

const TabStack = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <TabStack.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#e91e63',
        style: {
          ...styles.tabBar,
          ...styles.shadow,
        },
      }}
    >
      <TabStack.Screen
        name="Home"
        component={MyPlantsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <HomeIcon/>
            </View>
          ),
        }}
      />
            <TabStack.Screen
        name="MyPlants"
        component={MyPlantsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
                <MyPlantsIcon/>
            </View>
          ),
        }}
      />
      <TabStack.Screen
        name="AddPlant"
        component={MyPlantsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <AddPlantIcon/>
            </View>
          ),
        }}
      />
            <TabStack.Screen
        name="Watering"
        component={MyPlantsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
                <WateringIcon/>
            </View>
          ),
        }}
      />
      <TabStack.Screen
        name="Profile"
        component={MyPlantsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.item}>
              <ProfileIcon/>
            </View>
          ),
        }}
      />
    </TabStack.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0 ,
    height: 60,
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabNavigator;
