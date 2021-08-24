import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../../screens/user/AuthScreen';
import Onboarding from '../../screens/user/Onboarding'

const AuthStack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Login" component={AuthScreen} />
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;