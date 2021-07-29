import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './tab/index'

export default () => {

  return (
    <NavigationContainer>
   <TabNavigator/>

    </NavigationContainer>
  )
}