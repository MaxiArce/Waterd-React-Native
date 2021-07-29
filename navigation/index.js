import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./tab";
import AuthNavigator from "./auth"

export default () => {

  const loggedIn = useSelector((state) => state.auth.token);

  return (
    <NavigationContainer>
           {loggedIn
        ?       <TabNavigator />
        : <AuthNavigator />
      }

    </NavigationContainer>
  );
};
