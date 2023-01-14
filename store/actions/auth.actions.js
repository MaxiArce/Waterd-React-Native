import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL_AUTH_SIGNUP, URL_AUTH_LOGIN } from "../../constants/database";

export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const SET_INIT = "SET_INIT";
export const LOG_OUT = "LOG_OUT";

const errorMessages = {
  INVALID_EMAIL: "Invalid Email",
  EMAIL_EXISTS: "Email is already registered",
};

export const signup = (displayName, email, password) => {
  return async (dispatch) => {
    const response = await fetch(URL_AUTH_SIGNUP, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        displayName,
        returnSecureToken: true,
      }),
    });

    if (!response.ok) {
      const resData = await response.json();
      const errorCode = resData.error.message;
      const errorMessage =
        errorCode in errorMessages
          ? errorMessages[errorCode]
          : "Unable to register";

      throw new Error(errorMessage);
    }

    const resData = await response.json();
    //save id to asyncstorage
    AsyncStorage.setItem("display_name", resData.displayName);
    AsyncStorage.setItem("user_token", resData.idToken);
    AsyncStorage.setItem("user_local_id", resData.localId);
    //dispatch id to store
    dispatch({
      type: SIGNUP,
      displayName: resData.displayName,
      token: resData.idToken,
      user: resData.localId,
    });
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

    if (!response.ok) throw new Error("Unable to access");

    const resData = await response.json();
    //save id to asyncstorage
    AsyncStorage.setItem("display_name", resData.displayName);
    AsyncStorage.setItem("user_token", resData.idToken);
    AsyncStorage.setItem("user_local_id", resData.localId);
    //dispatch id to store
    dispatch({
      type: LOGIN,
      displayName: resData.displayName,
      token: resData.idToken,
      user: resData.localId,
    });
  };
};

//initialize state if the user is already logged in
export const setInit = () => {
  return async (dispatch) => {
    const getUser = await AsyncStorage.getItem("display_name").then(
      (displayNameValue) => {
        AsyncStorage.getItem("user_token").then((tokenValue) => {
          AsyncStorage.getItem("user_local_id").then((userValue) => {
            dispatch({
              type: SET_INIT,
              displayName: displayNameValue,
              token: tokenValue,
              user: userValue,
            });
          });
        });
      }
    );
  };
};

export const logOut = () => {
  return async (dispatch) => {
    AsyncStorage.setItem("display_name", "");
    AsyncStorage.setItem("user_token", "");
    AsyncStorage.setItem("user_local_id", "");
    dispatch({ type: LOG_OUT,displayName: null, token: null, user: null });
  };
};
