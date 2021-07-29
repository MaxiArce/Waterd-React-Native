import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Colors from  "../../constants/colors"
import PlantDetailsScreen from "../../screens/PlantDetailsScreen";
import MyPlantsListScreen from "../../screens/MyPlantsListScreen";

const MyPlantsStack = createStackNavigator();

const MyPlantsNavigator = () => (
  
    <MyPlantsStack.Navigator
      initialRouteName="MyPlantsList"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
          height: 100
        },
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: "canela-bold"
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          paddingStart: 15,
        }
      }}
    >
      <MyPlantsStack.Screen
        name="MyPlantsList"
        component={MyPlantsListScreen}
        options={({navigation}) => ({
          title : "Mis Plantas"
        })}
      />
      <MyPlantsStack.Screen
        name="PlantDetailsScreen"
        component={PlantDetailsScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
    </MyPlantsStack.Navigator>
);

export default MyPlantsNavigator;
