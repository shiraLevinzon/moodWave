import React, { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
// import DataContext from "../context/data";
import { FormContext } from "../context/data";
import Search from "../components/Search";
import { AntDesign } from "@expo/vector-icons";

//import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export default function MyPlaylist({ navigation }) {
  const { playlists, setPlaylists, setSonglist, currentUser, setPlaylistName } =
    useContext(FormContext);
  const [message, setMessage] = useState("");
  useEffect(() => {
    getPlaylists();
  }, []);
  const getPlaylists = async () => {
    const res = await fetch(
      `http://192.168.0.135:3000/api/v1/playlists/allPlaylists`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "server error occurred");
    }
    const data = await res.json();
    if (data.length == 0) {
      setMessage("your playlists is empty, lets create some!");
    }
    setPlaylists(data);
  };

  const addNewPlaylist = () => {
    console.log("addNewPlaylis");
    navigation.navigate("addNewPlaylist");
  };

  const selectPlaylist = async (item) => {
    // console.log(item +"nm,n,n");
    // Alert.alert("selectPlaylist")
    await setSonglist(item);
    navigation.navigate("Playlist", { playlist: item.songs });
    //return <PlaylistStack playlistFromTheList={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchAndIcon}>
        <Search navigation={navigation} />
      </View>
      <Text style={styles.playlistCoteret}>MY PLAYLISTS:</Text>
      <Text style={styles.message}>{message}</Text>
      <FlatList
        data={playlists}
        renderItem={({ item }) => (
          <View style={styles.viewItem}>
            <Text
              onPress={() => {
                console.log(item.songs);
                setPlaylistName(item.name);
                setSonglist(item.songs);
                navigation.navigate("Playlist");
              }}
              style={styles.item}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
      <AntDesign
        name="pluscircleo"
        size={50}
        color="#fff"
        onPress={addNewPlaylist}
        style={styles.iconView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
  iconView: {
    paddingTop: 580,
    paddingLeft: 25,
    position: "absolute",
  },
  playlistCoteret: {
    fontSize: 24,
    fontWeight: "bold",

    textAlign: "center",
    color: "purple",
  },
  message: {
    paddingTop: 50,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  item: {
    color: "#fff",
    padding: 20,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "purple",
  },
  viewItem: {
    backgroundColor: "#fff",
    // marginTop: 10,
    // marginHorizontal:10,
  },
});
