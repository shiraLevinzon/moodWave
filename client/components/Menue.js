import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "../routes/homeStack";
import PlaylistStack from "../routes/playlistStack";
import CameraStack from "../routes/CameraStack";
import Rooms from "../pages/romms";
import profileStack from "../routes/profileStack";

export default function Menue() {
  const MyTheme = {
    ...DarkTheme, // or DefaultTheme
    dark: true,
    colors: {
      ...DarkTheme.colors, // or DefaultTheme.colors
      background: "black", // Adjust as needed
    },
  };
  
  const Tab = createBottomTabNavigator();
  console.log("welcome to menue");
  return (

    <NavigationContainer independent={true} theme={MyTheme}>
      <Tab.Navigator >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Entypo name="home" size={size} color={"purple"} />
            ),
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Playlist"
          component={PlaylistStack}
          options={{ headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="playlist-music"
                size={24}
                color="purple"
              />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Camera"
          component={CameraStack}
          options={{ headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="camera" size={24} color="purple" />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Rooms"
          component={Rooms}
          options={{ headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-friends" size={24} color="purple" />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={profileStack}
          options={{ headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle" size={24} color="purple" />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
