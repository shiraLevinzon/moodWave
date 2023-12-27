import { createStackNavigator } from "react-navigation-stack";
import {createAppContainer} from 'react-navigation'
import Playlist from "../components/Playlist";
import MyPlaylist from "../pages/myPlaylist";

const screens={
    Playlists:{
        screen:MyPlaylist
    },
    Playlist:{
        screen:Playlist
    }
}


const PlaylistStack=createStackNavigator(screens)

export default createAppContainer(PlaylistStack);