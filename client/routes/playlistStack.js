import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
//import MyPlaylist from '../pages/MyPlaylist';
import Playlist from "../components/Playlist";
import MyPlaylist from "../pages/myPlaylist";

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
    </Stack.Navigator>
  );
};

export default PlaylistStack;

// import { createStackNavigator } from "react-navigation-stack";
// import {createAppContainer} from 'react-navigation'
// import Playlist from "../components/Playlist";
// import MyPlaylist from "../pages/myPlaylist";

// const screens={
//     Playlists:{
//         screen:MyPlaylist
//     },
//     Playlist:{
//         screen:Playlist
//     }
// }

// const PlaylistStack=createStackNavigator(screens)

// export default createAppContainer(PlaylistStack);
