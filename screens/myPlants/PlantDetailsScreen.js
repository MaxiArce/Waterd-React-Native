import React, { useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import PlantDetailsCard from "../../components/PlantDetailsCard";
import Colors from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { deletePlant } from '../../store/actions/plants.action'

const ItemDetailsScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const plant = useSelector((state) => state.plants.selected);
  const user = useSelector((state) => state.auth.user);


  const handleDeleteItem = (refId, user) =>{ dispatch(deletePlant(refId,user))}


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRightContainerStyle: {
        paddingEnd: 16,
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            handleDeleteItem(plant.refId,user)
            navigation.goBack();
          }}
        >
          <AntDesign name="delete" size={24} color={Colors.PRIMARY_DARK} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <PlantDetailsCard item={plant} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default ItemDetailsScreen;
