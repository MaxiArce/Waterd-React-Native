import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constants/colors";
import HomeScreen from "../../screens/HomeScreen";

const HomeStack = createStackNavigator();

const MyPlantsNavigator = () => (
  <HomeStack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: {
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
        backgroundColor: Colors.primary,
        height: 96,
      },
      headerTitleStyle: {
        fontSize: 34,
        fontFamily: "canela-bold",
        color: Colors.PRIMARY_DARK,
      },
      headerTintColor: "white",
      headerBackTitleVisible: false,
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => ({
        title: "Inicio",
        headerTitleAlign: "left",
      })}
    />
  </HomeStack.Navigator>
);

export default MyPlantsNavigator;
