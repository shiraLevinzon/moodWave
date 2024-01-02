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

import PlaylistStack from "../routes/playlistStack";
import CameraStack from "../routes/CameraStack";
import HomeStack from "../routes/homeStack";

export default function Menue() {
  const Tab = createBottomTabNavigator();
  console.log("welcome to menue");
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={color} />
            ),headerShown: false
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
            ),headerShown: false
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="camera" size={24} color="black" />
            ),headerShown: false
          }}
        />
        <Tab.Screen
          name="Rooms"
          component={Rooms}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-friends" size={24} color="black" />
            ),headerShown: false
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle" size={24} color="black" />
            ),headerShown: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
