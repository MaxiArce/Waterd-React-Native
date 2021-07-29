import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Button, Text } from "react-native";
import Colors from  "../../constants/colors"
import ItemDetailsScreen from "../../screens/ItemDetailsScreen";
import ListScreen from "../../screens/ListScreen";
import AddItemScreen from "../../screens/AddItemScreen";

const MyPlantsStack = createStackNavigator();

const MyPlantsNavigator = () => (
  
    <MyPlantsStack.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={ListScreen}
        options={({navigation}) => ({
          headerRight: () => (
            <Button
              onPress={() =>  navigation.navigate('AddItemScreen')}
              title="+"
              color="blue"
            />
          ),
          title : "Mis Plantas"
        })}
      />
      <MyPlantsStack.Screen
        name="ItemDetailsScreen"
        component={ItemDetailsScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <MyPlantsStack.Screen
        name="AddItemScreen"
        component={AddItemScreen}
        options={{ title: "Agregar planta" }}
      />
    </MyPlantsStack.Navigator>
);

export default MyPlantsNavigator;
