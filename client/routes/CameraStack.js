import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Playlist from "../components/Playlist";
import CameraPage from "../pages/camera";
import { Song } from "../components/Song";

const Stack = createStackNavigator();

const CameraStack = () => {
  return (
    <Stack.Navigator initialRouteName="CameraStack">
      <Stack.Screen
        name="Camera"
        component={CameraPage}
        options={{ title: "Camera Page" }}
      />
      <Stack.Screen
        name="Playlist"
        component={Playlist}
        options={{ title: "Playlist" }}
      />
      <Stack.Screen
        name="Song"
        component={Song}
        options={{ title: "Song" }}
      />
    </Stack.Navigator>
  );
};

export default CameraStack;

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
