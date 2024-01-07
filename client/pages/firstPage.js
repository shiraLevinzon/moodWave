import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginStack from "../routes/loginStack";
import { Menu } from "react-native-paper";
import LoginStack from '../routes/loginStack';
import { Menu } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Menue from '../components/Menue';


const Tab = createBottomTabNavigator();

export default function FirstPage() {

  
  console.log("Rendering FirstPage");
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
      >
        <Tab.Screen
          name="LoginPage"
          component={LoginStack}
          options={{ headerShown: false }}
        />
        <Tab.Screen
     
    <Tab.Navigator screenOptions={{headerShown:false ,   tabBarStyle:{
      display:"none"
    }}}>
      <Tab.Screen name="LoginPage" component={LoginStack} options={{ headerShown:false }}  />
      <Tab.Screen
          name="menue"
          component={Menu}
          options={{ headerShown: false }}
          component={Menue}
          options={{ headerShown:false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
    </Tab.Navigator>
  </NavigationContainer>

  )
}

// import React from 'react';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import LoginStack from '../routes/loginStack';
// import { Menu } from 'react-native-paper';

// const Tab = createBottomTabNavigator();

// export default function FirstPage() {
//   console.log("Rendering FirstPage");
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           display: "none",
//         },
//       }}
//     >
//       <Tab.Screen name="LoginPage" component={LoginStack} />
//       <Tab.Screen name="menue" component={Menu} />
//     </Tab.Navigator>
//   );
// }

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


// import React from 'react';
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import LoginStack from '../routes/loginStack';
// import { Menu } from 'react-native-paper';

// const Tab = createBottomTabNavigator();

// export default function FirstPage() {
//   console.log("Rendering FirstPage");
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           display: "none",
//         },
//       }}
//     >
//       <Tab.Screen name="LoginPage" component={LoginStack} />
//       <Tab.Screen name="menue" component={Menu} />
//     </Tab.Navigator>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Set your desired background color
  },
  splashText: {
    fontSize: 24,
    color: 'white', // Set your desired text color
  },
});