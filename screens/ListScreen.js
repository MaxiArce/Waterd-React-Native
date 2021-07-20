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

  //Guarda la variable que muestra u oculta el modal
  // const [modalVisibility, setmodalVisibility] = useState(false);

  //store
  const dispatch = useDispatch()
  const plants = useSelector(state => state.plants.list)
  const selectedPlant = useSelector(state => state.plants.selected)
  

  // const handleModal = (id) => {
  //   setItemSelected(itemList.find((item) => item.id === id));
  //   setmodalVisibility(true);
  // };


  const handleSelected = (selectedPlant) => {
    dispatch(selectPlant(selectedPlant.id))
    navigation.navigate('ItemDetailsScreen', { name: selectedPlant.name });
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
      {/* <Modal
        style={styles.modal}
        animationType="none"
        transparent={true}
        visible={modalVisibility}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>
            Estas seguro que quieres borrar {itemSelected.value}
          </Text>
          <Button
            onPress={() => {
              handleDeleteItem();
            }}
            title="Confirmar"
          />
          <Button
            title="Cancelar"
            onPress={() => {
              setmodalVisibility(false);
            }}
          />
        </View>
      </Modal> */}
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
