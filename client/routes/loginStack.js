import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import login from "../pages/login";
import Menue from "../components/Menue";

const Stack = createStackNavigator();

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={login}
        options={{ title: "Login"}}

      />
      <Stack.Screen
        name="Menue"
        component={Menue}
        
      />
    </Stack.Navigator>
  );
};

export default LoginStack;