import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Provider } from './context/data';
import Login from './pages/login';
import FirstPage from './pages/firstPage';
import Menue from './components/Menue';
import LoginStack from './routes/loginStack';



export default function App() {

 
  

  return (
    <Provider>
       <FirstPage/>
    </Provider>
    
  );
}

