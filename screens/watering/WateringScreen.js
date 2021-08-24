import React, {useEffect} from "react";
import { StyleSheet, View, FlatList , Text} from "react-native";
import {  useSelector, useDispatch } from "react-redux";
import { loadPlants } from "../../store/actions/plants.action";
import PlantWateringCard from "../../components/PlantWateringCard";


const WateringScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const plants = useSelector(state => state.plants.list);
    
  useEffect(() => {
    dispatch(loadPlants());
  }, []);
  

  const renderItem = ({ item }) =>  <PlantWateringCard item={item} showDetails={false}/>

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={plants}
        keyExtractor={item => item.refId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1,
    backgroundColor: "white",
    paddingBottom: 49
  },
  listContainer:{
    paddingHorizontal: 16,
    alignSelf: 'stretch',
  }
});

export default WateringScreen;
