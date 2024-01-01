import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import login from "../pages/login";
import Menue from "../components/Menue";
import { UserRegister } from "../pages/userRegister";

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false,
    tabBarStyle:{
      display:"none"
    }
     }}>
      <Stack.Screen
        name="Login"
        component={login}
        options={{ title: "Login" , headerShown: false }}
       

      />
      <Stack.Screen
        name="UserRegister"
        component={UserRegister}
        options={{ title: "UserRegister" , headerShown: false }}
       

      />
      <Stack.Screen
        name="Menue"
        component={Menue}
        options={{ headerShown: false }}
        
      />
    </Stack.Navigator>
  );
};

export default LoginStack;