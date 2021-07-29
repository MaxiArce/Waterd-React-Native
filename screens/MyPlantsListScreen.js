import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { deletePlant, selectPlant } from '../store/actions/plants.action'
import Colors from "../constants/colors";
import PlantItem from "../components/PlantItem";

const ListScreen = ( {navigation} ) => {

  //store
  const dispatch = useDispatch()
  const plants = useSelector(state => state.plants.list)
  const selectedPlant = useSelector(state => state.plants.selected)
  
  const handleSelected = (selectedPlant) => {
    dispatch(selectPlant(selectedPlant.id))
    navigation.navigate('PlantDetailsScreen', { name: selectedPlant.name });
  }

  const handleDeleteItem = (id) =>{ dispatch(deletePlant(id))}


  const renderItem = ({ item }) => <PlantItem item={item} onSelected={handleSelected} onDelete={handleDeleteItem}/>

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.listContainer}
        data={plants}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  modalContainer: {
    width: "80%",
    height: "20%",
    marginHorizontal: "10%",
    marginVertical: "70%",
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 20,
    color: "white",
    padding: 10,
  },
});

export default ListScreen;
