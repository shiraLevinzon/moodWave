import React, { useContext } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
// import DataContext from "../context/data";
import {FormContext}  from "../context/data";
import Search from "../components/Search";
import { AntDesign } from "@expo/vector-icons";


//import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export default function MyPlaylist({ navigation }) {
  const { playlists, setSonglist } = useContext(FormContext);

  const addNewPlaylist = () => {
    console.log("addNewPlaylis");
    navigation.navigate("addNewPlaylist")
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
      <AntDesign
        name="pluscircleo"
        size={24}
        color="black"
        onPress={addNewPlaylist}
      />
      <Search />
      <Text style={styles.playlistCoteret}>YOUR PLAYLIST</Text>
      <FlatList
        data={playlists}
        renderItem={({ item }) => (
          <View style={styles.viewItem}>
            <Text onPress={async ()=>{
              await setSonglist([...item.songs]);
               navigation.navigate("Playlist");
              // selectPlaylist(item.songs)
              }} style={styles.item}>
              {item.playlistName}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  playlistCoteret: {
    paddingLeft: 15,
    fontSize: 21,
  },
  item: {
    // marginTop:24,
    padding: 30,
    fontSize: 20,
    // backgroundColor:'blue',
  },
  viewItem: {
    backgroundColor: "pink",
    marginTop: 24,
    // marginHorizontal:10,
  },
});
