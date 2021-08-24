import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";
import { URL_API } from "../constants/database";

const db = SQLite.openDatabase("plants.db");

//init sql if it doesnt exist
export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS plants (
          id INTEGER PRIMARY KEY NOT NULL,
          refId TEXT NOT NULL,
          name TEXT NOT NULL,
          iconId TEXT NOT NULL,
          isExteriorPlant TEXT NOT NULL,
          wateringDays INTEGER NOT NULL,
          wateringTimeStamp TEXT         
        )`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

  return promise;
};

//updated sql db from firebase - only updates when response is ok
export const updateSQL = async (user) => {
  try {
    const response = await fetch(`${URL_API}Users/${user}/Plants.json`);
    const result = await response.json();
    if (response.ok) {
      if (result === null) {
        //clears local db when firebase db is empty
        clearDB();
      }
      if (result) {
        //clears local db and loads the content from firebase db
        clearDB();
        Object.keys(result).forEach((key) => {
          insertNewPlant({ refId: key, ...result[key] });
        });
      }
    } else {
      Alert.alert("No se pudo actualizar");
    }
  } catch (err) {
    console.error(err.message);
  }
};

//insert new plant to sql db
export const insertNewPlant = ({
  refId,
  name,
  iconId,
  isExteriorPlant,
  wateringDays,
  wateringTimeStamp,
}) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO plants (refId, name, iconId, isExteriorPlant, wateringDays, wateringTimeStamp) VALUES (?, ?, ?, ?, ?, ?)`,
        [refId, name, iconId, isExteriorPlant, wateringDays, wateringTimeStamp],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

//delete plant from sql db
export const deleteRowPlant = (refId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM plants WHERE refId = ?`,
        [refId],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

//updates watering time stamp from sql db
export const updateWateringTimeStamp = (currentDate, refId) => {
  const wateringTimeStamp = currentDate;
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE plants SET wateringTimeStamp= ? WHERE refId= ?`,
        [wateringTimeStamp, refId],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });

  return promise;
};

//fetch plants from sql db
export const fetchPlants = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM plants`,
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};

//clears db
export const clearDB = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `DELETE FROM plants`,
        [],
        (_, result) => resolve(result),
        (_, err) => reject(err)
      );
    });
  });
  return promise;
};
