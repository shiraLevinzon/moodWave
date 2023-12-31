import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Provider as PaperProvider } from "react-native-paper";

import MyPlaylist from "../pages/myPlaylist";
import CameraPage from '../pages/camera';
import Rooms from "../pages/romms";
import Profile from "../pages/profile";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import Home from "../pages/home";
import playlistStack from "../routes/playlistStack";
import PlaylistStack from "../routes/playlistStack";
import CameraStack from "../routes/CameraStack";

export default function Menue() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),
          }}
        />

        <Tab.Screen
          name="Playlist"
          component={PlaylistStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="playlist-music"
                size={24}
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="camera" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Rooms"
          component={Rooms}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-friends" size={24} color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle" size={24} color="black" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
