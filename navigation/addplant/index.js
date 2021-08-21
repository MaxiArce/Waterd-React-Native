import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import PickPlantImageScreen from "../../screens/addPlant/PickPlantImageScreen";
import IdentifyPlantScreen from "../../screens/addPlant/IdentifyPlantScreen";
import AddPlantScreen from "../../screens/addPlant/AddPlantScreen";
import { AntDesign } from "@expo/vector-icons";

const AddPlantStack = createStackNavigator();

const AddPlantNavigator = () => (
  <AddPlantStack.Navigator
    initialRouteName="PickPlantImage"
    screenOptions={{
      headerStyle: {
        backgroundColor: "white",
        height: 96,
        elevation: 0, // remove shadow on Android
        shadowOpacity: 0, // remove shadow on iOS
      },
      headerTitleStyle: {
        fontSize: 17,
        fontFamily: "jakarta-bold",
      },
      headerTintColor: Colors.PRIMARY_DARK,
      headerBackTitleVisible: false,
      headerRightContainerStyle: {
        paddingEnd: 15,
      },
    }}
  >
    <AddPlantStack.Screen
      name="PickPlantImage"
      component={PickPlantImageScreen}
      options={({ navigation }) => ({
        title: "Agregar planta",
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="close" size={24} color={Colors.PRIMARY_DARK} />
          </TouchableOpacity>
        ),
      })}
    />
    <AddPlantStack.Screen
      name="IdentifyPlant"
      component={IdentifyPlantScreen}
      options={({ navigation }) => ({
        title: "",
        headerStyle: {
          backgroundColor: Colors.PRIMARY_DARK,
          height: 96,
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, // remove shadow on iOS
        }
      })}
    />
    <AddPlantStack.Screen
      name="AddPlant"
      component={AddPlantScreen}
      options={({ navigation }) => ({
        title: "Agregar planta",
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PickPlantImage");
            }}
          >
            <AntDesign name="close" size={24} color={Colors.PRIMARY_DARK} />
          </TouchableOpacity>
        ),
      })}
    />
  </AddPlantStack.Navigator>
);

export default AddPlantNavigator;
