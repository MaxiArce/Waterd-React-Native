import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./tab";
import AuthNavigator from "./auth";
import { updateSQL } from "../db";
import { setInit } from '../store/actions/auth.actions';


export default () => {
  
  const dispatch = useDispatch()
  const loggedIn = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  
  // Updates DB if the the user is loggedIn
  useEffect(() => {
    dispatch(setInit())
    if(loggedIn){
      updateSQL(user)
    }
  },[loggedIn]);

  return (
    <NavigationContainer>
      {loggedIn ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
