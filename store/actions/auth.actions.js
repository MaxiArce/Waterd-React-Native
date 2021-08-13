import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_AUTH_SIGNUP, URL_AUTH_LOGIN } from "../../constants/database";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const SET_INIT = "SET_INIT";
export const LOG_OUT = "LOG_OUT";

const errorMessages = {
  INVALID_EMAIL: "Email inválido",
  EMAIL_EXISTS: "Email ya se encuentra registrado",
};

export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(URL_AUTH_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const resData = await response.json();
      const errorCode = resData.error.message;
      const errorMessage =
        errorCode in errorMessages
          ? errorMessages[errorCode]
          : "No se ha podido registrar";

      throw new Error(errorMessage);
    }

    const resData = await response.json();
    //save id to asyncstorage
    AsyncStorage.setItem("user_token", resData.idToken);
    AsyncStorage.setItem("user_local_id", resData.localId);
    //dispatch id to store
    dispatch({ type: SIGNUP, token: resData.idToken, user: resData.localId });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(URL_AUTH_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    });
    
    if (!response.ok) throw new Error("No se pudo acceder");

    const resData = await response.json();
    //save id to asyncstorage
    AsyncStorage.setItem("user_token", resData.idToken);
    AsyncStorage.setItem("user_local_id", resData.localId);
    //dispatch id to store
    dispatch({ type: LOGIN, token: resData.idToken, user: resData.localId });
  };
};

//initialize state if the user is already logged in
export const setInit = () => {
  return async (dispatch) => {
    const getUser = await AsyncStorage.getItem("user_token").then(
      (tokenValue) => {
        AsyncStorage.getItem("user_local_id").then((userValue) => {
          dispatch({ type: SET_INIT, token: tokenValue, user: userValue });
        });
      }
    );
  };
};

export const logOut = () => {
  return async (dispatch) => {
    AsyncStorage.setItem("user_token", "");
    AsyncStorage.setItem("user_local_id", "");
    dispatch({ type: LOG_OUT, token: null, user: null });
  };
};
