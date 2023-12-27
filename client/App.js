import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Menue from './components/Menue';
import { Provider } from './context/data';


export default function App() {

  

  return (
   
    <Provider>
    <Menue/>
    </Provider>

    
  );
}

