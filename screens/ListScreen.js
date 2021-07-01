import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Button,
  FlatList,
  Modal,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Colors from "../constants/colors";
import Header from "../components/Headers";
import Card from "../components/Card";
import Input from "../components/Input";

const ListScreen = ({ showItemSelected }) => {
  //Guarda el texto del input
  const [inputText, setInputText] = useState("");
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

  const handleAddItem = () => {
    if (inputText) {
      setItemList([
        { id: Math.random().toString(), value: inputText },
        ...itemList,
      ]);
      setInputText("");
    } else {
      Alert.alert("Ingresa un valor!");
    }
  };

  const handleDeleteItem = () => {
    const id = itemSelected.id;
    setItemList(itemList.filter((item) => item.id !== id));
    setmodalVisibility(false);
    setItemSelected({});
  };

  return (
    <View style={styles.screen}>
      <Header title="Titulo"></Header>
      <View style={styles.textInputContainer}>
        <Input
          style={styles.textInput}
          placeholder="Ingrese algun dato"
          onChangeText={(text) => setInputText(text)}
          value={inputText}
        />
        <View style={styles.buttonAdd}>
          <Button
            style={styles.buttonAdd}
            title={"+"}
            onPress={handleAddItem}
          ></Button>
        </View>
      </View>
      <FlatList
        style={styles.listContainer}
        data={itemList}
        renderItem={(data) => {
          return (
            <TouchableWithoutFeedback
              onPress={() => {
                showItemSelected(data.item.value);
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
            Estas seguro que quieres borrar ${itemSelected.value}
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
  textInputContainer: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    padding: 5,
    width: "100%",
    height: 60,
    alignContent: "center",
    justifyContent: "center",
  },
  textInput: {
    flexGrow: 1,
    maxWidth: "90%",
    paddingHorizontal: 10,
    fontSize: 20,
    maxHeight: 36,
    borderRadius: 10,
  },
  buttonAdd: {
    marginLeft: 10,
  },
  cardContent: {
    width: "90%",
  },
  cartText: {
    fontSize: 24,
    fontFamily: 'roboto',
    paddingLeft: 10,
    color: "white",
  },
  cartDescription: {
    fontSize: 18,
    fontFamily: 'roboto',
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
