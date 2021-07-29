import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from "../../constants/colors";
import PlantDetailsScreen from "../../screens/PlantDetailsScreen";
import MyPlantsListScreen from "../../screens/MyPlantsListScreen";

const MyPlantsStack = createStackNavigator();

const MyPlantsNavigator = () => (
  <MyPlantsStack.Navigator
    initialRouteName="MyPlantsList"
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
    <MyPlantsStack.Screen
      name="MyPlantsList"
      component={MyPlantsListScreen}
      options={({ navigation }) => ({
        title: "Mis Plantas",
        headerTitleAlign: 'left',
        headerTitleContainerStyle: { padding:0, margin:0 } 
      })}
    />
    <MyPlantsStack.Screen
      name="PlantDetailsScreen"
      component={PlantDetailsScreen}
      options={({ route }) => ({
        title: "",
        headerStyle: {
          backgroundColor: "transparent",
        },
      })}
    />
  </MyPlantsStack.Navigator>
);

export default MyPlantsNavigator;
