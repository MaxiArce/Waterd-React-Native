import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/colors";
import AddPlantScreen from "../../screens/AddPlantScreen";
import { AntDesign } from "@expo/vector-icons";

const AddPlantStack = createStackNavigator();

const AddPlantNavigator = () => (
  <AddPlantStack.Navigator
    initialRouteName="AddPlant"
    screenOptions={{
      headerStyle: {
        backgroundColor: "#F9F9F9",
        height: 80,
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
      name="AddPlant"
      component={AddPlantScreen}
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
  </AddPlantStack.Navigator>
);

export default AddPlantNavigator;
