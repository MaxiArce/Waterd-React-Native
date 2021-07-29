import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";
import PlantDetailsCard from '../components/PlantDetailsCard'

const ItemDetailsScreen = ({navigation}) => {

const plant = useSelector(state => state.plants.selected)

  return (
    
    <View style={styles.screen}>
      <PlantDetailsCard item={plant}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex:1
  },
});

export default ItemDetailsScreen;
