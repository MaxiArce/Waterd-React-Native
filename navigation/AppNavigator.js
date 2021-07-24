import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
import Colors from  "../constants/colors"
import ItemDetailsScreen from "../screens/ItemDetailsScreen";
import ListScreen from "../screens/ListScreen";
import AddItemScreen from "../screens/AddItemScreen";

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
          height: 100
        },
        headerTitleStyle: {
          fontSize: 24
          // fontFamily: "jakarta-bold"
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          paddingStart: 15,
        }
      }}
    >
      <Stack.Screen
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
      <Stack.Screen
        name="ItemDetailsScreen"
        component={ItemDetailsScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen
        name="AddItemScreen"
        component={AddItemScreen}
        options={{ title: "Agregar planta" }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
