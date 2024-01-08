import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import login from "../pages/login";
import Menue from "../components/Menue";
import { UserRegister } from "../pages/userRegister";
import ArtistRegistration from "../pages/registerArtist";
import AddSong from "../pages/addSong";
import ArtistLogin from "../pages/loginArtist";

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
        name="ArtistRegistration"
        component={ArtistRegistration}
        options={{ title: "ArtistRegistration" , headerShown: false }}
      />
      <Stack.Screen
        name="ArtistLogin"
        component={ArtistLogin}
        options={{ title: "ArtistLogin" , headerShown: false }}
      />
      <Stack.Screen
        name="AddSong"
        component={AddSong}
        options={{ title: "AddSong" , headerShown: false }}
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