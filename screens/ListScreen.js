import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, FlatList,Modal,Text } from "react-native";
import Colors from "../constants/colors";

const ListScreen = () => {

  //Guarda el texto del input
  const [inputText, setInputText] = useState("");
  //Guarda la lista de items
  const [itemList, setItemList] = useState([]);
  //Guarda el item seleccionado
  const [itemSelected , setItemSelected] = useState({});
  //Guarda la variable que muestra u oculta el modal
  const [modalVisibility, setmodalVisibility] = useState(false);


  const handleModal = (id) => {
    setItemSelected (itemList.find(item => item.id === id ));
    setmodalVisibility(true);
  };

  const handleAddItem = () => {
    setItemList([
      { id: Math.random().toString(), value: inputText },
      ...itemList,
    ]);
    setInputText("");
  };

  const handleDeleteItem = () => {
    const id = itemSelected.id
    setItemList(itemList.filter (item => item.id !== id));
    setmodalVisibility(false);
    setItemSelected({});
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Ingrese algun dato"
          onChangeText={(text) => setInputText(text)}
          value={inputText}
        />
        <Button style={styles.buttonAdd} title={"+"} onPress={handleAddItem}></Button>
        </View>
        <FlatList style={styles.listContainer}
        data = {itemList}
        renderItem = {data => {
          return (
            <View style={styles.cardContainer}>
              <View style={styles.cardContent}>
                <Text style={styles.cartText}>{data.item.value}</Text>
                <Text style={styles.cartDescription}>Test</Text>
              </View>
              <Button title="X" onPress = {() => {handleModal(data.item.id)}} ></Button>
            </View>
          );
        }}
      /> 
      <Modal style={styles.modal} animationType='none' transparent={true} visible={modalVisibility}>
        <View style={styles.modalContainer} >
          <Text style={styles.modalText}>Estas seguro que quieres borrar ${itemSelected.value}</Text>
          <Button 
            onPress = {() => {handleDeleteItem()}}
            title='Confirmar'
          />
          <Button 
            title='Cancelar'
            onPress = {() => {setmodalVisibility(false)}}
          />
        </View>
      </Modal>
  </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.accent,
  },
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    padding: 5,
    width: '100%',
    height: 60,
    alignContent: 'center',
    justifyContent: 'center'
  },
  textInput: {
    flexGrow: 1,
    paddingHorizontal: 10,
    fontSize: 20,
    maxHeight: 36,
    maxWidth: '90%',
    borderRadius: 10,
    color: '#EBEBF560',
    backgroundColor: Colors.secondary,
  },
  buttonAdd: {
    fontSize: 30
  },  cardContainer: {
    flexDirection: "row",
    width: "96%",
    marginTop: 20,
    marginHorizontal: "2%",
    padding: 20,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  cardContent:{
    width: '90%'
  },
  cartText: {
    fontSize: 24,
    color: "white"
  },
  cartDescription:{
    fontSize: 18,
    color: Colors.secondary
  },
  modalContainer: {
    width: "80%",
    height: "20%",
    marginHorizontal: "10%",
    marginVertical: "70%",
    borderRadius: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  modalText: {
    fontSize: 20,
    color: "white",
    padding: 10
  }

});

export default ListScreen;
