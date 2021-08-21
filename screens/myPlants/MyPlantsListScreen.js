import React, {useEffect, componentDidMount} from "react";
import {  useSelector, useDispatch } from "react-redux";
import {
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { loadPlants, selectPlant } from '../../store/actions/plants.action';
import Colors from "../../constants/colors";
import PlantItemCard from "../../components/PlantItemCard";

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

  const renderItem = ({ item }) => <PlantItemCard item={item} onSelected={handleSelected} />

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={plants}
        horizontal={false}
        numColumns = {2}
        keyExtractor={item => item.refId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 16,
  },
  listContainer:{
    alignSelf: 'stretch',
    marginHorizontal: 16,
  }
});

export default ListScreen;
