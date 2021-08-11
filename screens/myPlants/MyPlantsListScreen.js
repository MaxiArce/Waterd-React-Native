import React, {useEffect, componentDidMount} from "react";
import {  useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { loadPlants, selectPlant } from '../../store/actions/plants.action';
import Colors from "../../constants/colors";
import PlantItemRow from "../../components/PlantItemRow";

const ListScreen = ( {navigation} ) => {


  //store
  const dispatch = useDispatch();
  const plants = useSelector(state => state.plants.list);
  const selectedPlant = useSelector(state => state.plants.selected);

  useEffect(() => {
    dispatch(loadPlants());
  },[]);
  
  const handleSelected = (selectedPlant) => {
    dispatch(selectPlant(selectedPlant.refId))
    navigation.navigate('PlantDetailsScreen', { name: selectedPlant.name });
  }

  const renderItem = ({ item }) => <PlantItemRow item={item} onSelected={handleSelected} />

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.listContainer}
        data={plants}
        keyExtractor={item => item.refId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    marginBottom: 49,
  },
});

export default ListScreen;
