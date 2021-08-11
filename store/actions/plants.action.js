import { Alert } from "react-native";
import { URL_API } from "../../constants/database";
export const SELECT_PLANT = "SELECT_PLANT";
export const ADD_PLANT = "ADD_PLANT";
export const DELETE_PLANT = "DELETE_PLANT";
export const LOAD_PLANTS = "LOAD_PLANTS";
export const UPDATE_PLANTS = "UPDATE_PLANTS";
import { insertNewPlant, fetchPlants, deleteRowPlant } from "../../db";

//allows to set selected plant
export const selectPlant = (refId) => ({
  type: SELECT_PLANT,
  plantID: refId,
});

//allows to delete a selected plant using the id 
export const deletePlant = (refId, user) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${URL_API}/Users/${user}/Plants/${refId}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        //delete from sqlite db
        deleteRowPlant(refId)
        //delete from store
        dispatch({ type: DELETE_PLANT, plantID: refId });
      } else {
        Alert.alert("Ha ocurrido un error", ""[{ text: "OK" }]);
      }
    } catch (error) {
      throw error;
    }
  };
};

//load plants from sql and set them to the store 
export const loadPlants = () => {
  return async (dispatch) => {
    try {
      const result = await fetchPlants();
      dispatch({ type: LOAD_PLANTS, list: result.rows._array });
    } catch (error) {
      throw error;
    }
  };
};

//add new plant to firebase and then updates sql and store
export const addPlant = (payload, user) => {
  return async (dispatch) => {
    //try to update plant to firebase
    try {
      const response = await fetch(`${URL_API}/Users/${user}/Plants.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
        }),
      });
      const result = await response.json();
      //add plant to sqlite db and state if response is ok
      if (response.ok) {
        //add plant to sqlite db
        insertNewPlant(
          result.name,
          payload.name,
          payload.description,
          payload.image
        ),
          //dispatch to store
          dispatch({
            type: ADD_PLANT,
            payload: { refId: result.name, ...payload },
          });
      } else {
        Alert.alert("Ha ocurrido un error", ""[{ text: "OK" }]);
      }
    } catch (error) {
      throw error;
    }
  };
};
