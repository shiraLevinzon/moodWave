import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import MyPlaylist from '../pages/MyPlaylist';
import Playlist from "../components/Playlist";
import Home from "../pages/home";
import { Song } from "../components/Song";
import Profile from "../pages/profile";
import Login from "../pages/login";

const Stack = createStackNavigator();
const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ title: "My Profile" }}
      />
      <Stack.Screen
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: "none",
          },
        }}
        name="login"
        component={Login}
        options={{ title: "login" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
