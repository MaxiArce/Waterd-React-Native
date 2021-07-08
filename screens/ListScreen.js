import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Button,
  FlatList,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../constants/colors";
import Card from "../components/Card";

const ListScreen = ( {route, navigation} ) => {



  //Guarda la lista de items
  const [itemList, setItemList] = useState([]);
  //Guarda el item seleccionado
  const [itemSelected, setItemSelected] = useState({});
  //Guarda la variable que muestra u oculta el modal
  const [modalVisibility, setmodalVisibility] = useState(false);
  
  

  const handleModal = (id) => {
    setItemSelected(itemList.find((item) => item.id === id));
    setmodalVisibility(true);
  };


  useEffect(() => {
    if (route.params) {
      const  {itemName}  = route.params;
      console.log(itemName)
      setItemList([
        { id: Math.random().toString(), value: itemName },
        ...itemList,
      ])
    }
  }, [route.params])


  const handleDeleteItem = () => {
    const id = itemSelected.id;
    setItemList(itemList.filter((item) => item.id !== id));
    setmodalVisibility(false);
    setItemSelected({});
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.listContainer}
        data={itemList}
        renderItem={(data) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate("ItemDetailsScreen", {
                  name: data.item.value
                })
              }}
            >
              <View>
                <Card

                >
                  <Image source={require("../assets/images/plant.png")} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cartText}>{data.item.value}</Text>
                    <Text style={styles.cartDescription}>Test</Text>
                  </View>
                  <View>
                    <Button
                      title="X"
                      onPress={() => {
                        handleModal(data.item.id);
                      }}
                    ></Button>
                  </View>
                </Card>
              </View>
            </TouchableWithoutFeedback>
          );
        }}
      />
      <Modal
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
  cardContent: {
    width: "90%",
  },
  cartText: {
    fontSize: 24,
    fontFamily: 'montserrat',
    paddingLeft: 10,
    color: "white",
  },
  cartDescription: {
    fontSize: 18,
    fontFamily: 'montserrat',
    paddingLeft: 10,
    color: Colors.secondary,
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
