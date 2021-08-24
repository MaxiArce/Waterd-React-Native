import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast, {BaseToast} from "react-native-toast-message";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./tab";
import AuthNavigator from "./auth";
import { setInit } from "../store/actions/auth.actions";
import Colors from '../constants/colors'

export default () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.token);

  //toast config file 
  const toastConfig = {
    success: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: Colors.PRIMARY_DARK}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 19,
          fontFamily: 'jakarta-bold'
        }}
        text2Style={{
          fontSize: 11,
          fontFamily: 'jakarta'
        }}
        text1={text1}
        text2={text2}
      />
    ),
    error: ({ text1, text2, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: Colors.WARNING}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 19,
          fontFamily: 'jakarta-bold'
        }}
        text2Style={{
          fontSize: 11,
          fontFamily: 'jakarta'
        }}
        text1={text1}
        text2={text2}

      />
    ),
  
    
  };

  //initialize state if the user is already logged in (set user and token to async storage)
  useEffect(() => {
    dispatch(setInit());
  }, []);

  return (
    <NavigationContainer>
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};
