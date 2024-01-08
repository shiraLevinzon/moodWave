import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginStack from "../routes/loginStack";




import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Menue from '../components/Menue';


const Tab = createBottomTabNavigator();

export default function FirstPage() {

  
  console.log("Rendering FirstPage");
  return (
    <NavigationContainer independent={true}>
      
      <Tab.Navigator screenOptions={{ headerShown: false,  tabBarStyle: {  display: "none",}, }} >
        <Tab.Screen
          name="LoginPage"
          component={LoginStack}
          options={{ headerShown: false }}
        />


      <Tab.Screen
          name="menue"
          component={Menue}
          options={{ headerShown:false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black", // Set your desired background color
  },
  splashText: {
    fontSize: 24,
    color: "white", // Set your desired text color
  },
});


