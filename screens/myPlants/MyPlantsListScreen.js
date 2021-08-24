import React, { useEffect, componentDidMount } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, FlatList } from "react-native";
import {  selectPlant } from "../../store/actions/plants.action";
import PlantItemCard from "../../components/PlantItemCard";

const ListScreen = ({ navigation }) => {
  //store
  const dispatch = useDispatch();
  const plants = useSelector((state) => state.plants.list);

  //dispatch selected plant to redux, then navigate to the next screen
  const handleSelected = (selectedPlant) => {
    dispatch(selectPlant(selectedPlant.refId));
    navigation.navigate("PlantDetailsScreen", { name: selectedPlant.name });
  };

  //item to be render inside flatlist
  const renderItem = ({ item }) => (
    <PlantItemCard item={item} onSelected={handleSelected} />
  );

  return (
    <View style={styles.screen}>
      <FlatList
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={plants.sort((a, b) => a.name.localeCompare(b.name))}
        horizontal={false}
        numColumns={2}
        keyExtractor={(item) => item.refId}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  listContainer: {
    alignSelf: "stretch",
    paddingHorizontal: 16,
    paddingBottom: 49,
  },
});

export default ListScreen;
