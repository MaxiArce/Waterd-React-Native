import { URL_API } from "../../constants/database";
import {
  insertNewPlant,
  fetchPlants,
  deleteRowPlant,
  updateWateringTimeStamp,
} from "../../db";
import Toast from "react-native-toast-message";

export const SELECT_PLANT = "SELECT_PLANT";
export const ADD_PLANT = "ADD_PLANT";
export const DELETE_PLANT = "DELETE_PLANT";
export const LOAD_PLANTS = "LOAD_PLANTS";
export const WATER_PLANT = "WATER_PLANT";

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
        deleteRowPlant(refId);
        //delete from store
        dispatch({ type: DELETE_PLANT, plantID: refId });
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Completado",
          text2: "Planta eliminada 👋",
        });
      } else {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Ups!",
          text2: "Ha ocurrido un error😅",
        });
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
        insertNewPlant({
          refId: result.name,
          name: payload.name,
          iconId: payload.iconId,
          isExteriorPlant: payload.isExteriorPlant,
          wateringDays: payload.wateringDays,
          wateringTimeStamp: payload.wateringTimeStamp,
        }),
          //dispatch to store
          dispatch({
            type: ADD_PLANT,
            payload: { refId: result.name, ...payload },
          });
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Listo!",
          text2: "Planta agregada con éxito 🌵",
        });
      } else {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Ups!",
          text2: "Ha ocurrido un error😅",
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

//set a new timeStamp for the last time the plant was watered
export const waterPlant = (user, refId, currentDate) => {
  return async (dispatch) => {
    try {
      const payload = { wateringTimeStamp: currentDate };
      const response = await fetch(
        `${URL_API}/Users/${user}/Plants/${refId}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
          }),
        }
      );
      //update sqlite db
      updateWateringTimeStamp(currentDate, refId);
      // //update store
      dispatch({ type: WATER_PLANT, plantID: refId, timeStamp: currentDate });

      if (response.ok) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Listo!",
          text2: "Planta regada 💦🌵",
          onLeadingIconPress: Toast.hide(),
          onTrailingIconPress: Toast.hide(),
        });
      } else {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Ups!",
          text2: "Ha ocurrido un error😅",
        });
      }
    } catch (error) {
      throw error;
    }
  };
};
