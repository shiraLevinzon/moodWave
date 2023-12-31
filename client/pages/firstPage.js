import React from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginStack from '../routes/loginStack';
import { Menu } from 'react-native-paper';


const Tab = createBottomTabNavigator();


export default function FirstPage() {
  return (
    <NavigationContainer independent={true}>
    <Tab.Navigator>
      <Tab.Screen name="LoginPage" component={LoginStack} />
      <Tab.Screen
          name="menue"
          component={Menu}
          options={{ headerShown:false }}
        />
    </Tab.Navigator>
  </NavigationContainer>
  )
}
