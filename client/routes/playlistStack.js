import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import MyPlaylist from '../pages/MyPlaylist';
import Playlist from "../components/Playlist";
import MyPlaylist from "../pages/myPlaylist";
import AddNewPlaylist from "../pages/addNewPlaylist";

const Stack = createStackNavigator();

const PlaylistStack = () => {
  return (
    <Stack.Navigator initialRouteName="MyPlaylist">
      <Stack.Screen
        name="MyPlaylist"
        component={MyPlaylist}
        options={{ title: "My Playlist" }}
      />
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{ title: "Playlist" }}
      />
        <Stack.Screen
        name="addNewPlaylist"
        component={AddNewPlaylist}
        options={{ title: "createNew" }}
      />
    </Stack.Navigator>
  );
};

export default PlaylistStack;

