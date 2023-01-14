import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constants/colors";
import WateringScreen from "../../screens/watering/WateringScreen";

const WateringStack = createStackNavigator();

const WateringNavigator = () => (
  <WateringStack.Navigator
    initialRouteName="Watering"
    screenOptions={{
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        backgroundColor: Colors.primary,
        height: 96,
      },
      headerTitleStyle: {
        fontSize: 32,
        fontFamily: "canela-bold",
        color: Colors.PRIMARY_DARK,
      },
      headerTintColor: "white",
      headerBackTitleVisible: false,
    }}
  >
    <WateringStack.Screen
      name="Watering"
      component={WateringScreen}
      options={({ navigation }) => ({
        title: "Watering",
        headerTitleAlign: "left",
      })}
    />
  </WateringStack.Navigator>
);

export default WateringNavigator;
