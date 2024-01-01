import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import MyPlaylist from '../pages/MyPlaylist';
import Playlist from "../components/Playlist";
import Home from "../pages/home";
import { Song } from "../components/Song";

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: "My Playlist" }}
      />
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{ title: "Playlist" }}
      />
      <Stack.Screen name="Song" component={Song} options={{ title: "Song" }} />
    </Stack.Navigator>
  );
};

export default HomeStack;
