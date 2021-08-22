import React, {useEffect} from "react";
import { StyleSheet, View, FlatList , Text} from "react-native";
import {  useSelector, useDispatch } from "react-redux";
import { loadPlants, waterPlant } from "../../store/actions/plants.action";
import PlantWateringCard from "../../components/PlantWateringCard";


const WateringScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const plants = useSelector(state => state.plants.list);
  useEffect(() => {
    dispatch(loadPlants());
  },[]);

  const handleWatering = (item) => {
    const currentDate = new Date();
    dispatch(waterPlant(user,item.refId,currentDate));
  }

  const renderItem = ({ item }) => <PlantWateringCard item={item} onSelected={handleWatering}/>


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
    paddingVertical: 16,
  },
  listContainer:{
    marginHorizontal: 16,
    alignSelf: 'stretch',
  }
});

export default WateringScreen;
