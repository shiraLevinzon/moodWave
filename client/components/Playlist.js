import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, LogBox, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FormContext } from "../context/data";
import { AntDesign } from "@expo/vector-icons";
import { color } from "react-native-elements/dist/helpers";
import { useFocusEffect } from "@react-navigation/native";

export default function Playlist({ navigation }) {
  const {
    songlist,
    setSonglist,
    playlistName,
    setPlaylists,
    playlists,
    likeSongList,
    setLikeSongList,
    defaultPlaylists,
    setDefaultPlaylists,
    currentUser,
  } = useContext(FormContext);
  const [heartColor, setHeartColor] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      console.log(
        "--------defaults---------",
        defaultPlaylists["My Favorites"].songs
      );
      const favorites = defaultPlaylists["My Favorites"].songs;

      setHeartColor((prevHeartColor) => {
        const updatedColors = [...prevHeartColor];

        songlist.forEach((song, index) => {
          if (favorites.includes(song._id)) {
            updatedColors[index] = "red";
          } else {
            updatedColors[index] = "grey";
          }
        });

        return updatedColors;
      });
    }, [songlist, defaultPlaylists])
  );

  const addSongToFavorites = async (song) => {
    console.log("------------------add-----------------------");
    const res = await fetch(
      `http://192.168.0.135:3000/api/v1/playlists/${defaultPlaylists["My Favorites"]._id}/addSong`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(song),
      }
    );
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "server error occurred");
    }
    const data = await res.json();

    const newFavorites = [...defaultPlaylists["My Favorites"].songs, song.song];

    setDefaultPlaylists((prevPlaylists) => ({
      ...prevPlaylists,
      "My Favorites": {
        ...prevPlaylists["My Favorites"],
        songs: newFavorites,
      },
    }));

  };

  const deleteSongFromFavorites = async (song) => {
    console.log("------------------delete-----------------------");
    const res = await fetch(
      `http://192.168.0.135:3000/api/v1/playlists/${defaultPlaylists["My Favorites"]._id}/deleteSong`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(song),
      }
    );
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "server error occurred");
    }
    const data = await res.json();
    console.log("delete", song);
    const newFavorites = defaultPlaylists["My Favorites"].songs.filter(
      (song1) => song1 != null && song1 != song.song
    );
    setDefaultPlaylists((prevPlaylists) => ({
      ...prevPlaylists,
      "My Favorites": {
        ...prevPlaylists["My Favorites"],
        songs: newFavorites,
      },
    }));
    setSonglist([...newFavorites.songs]);
  };
  const handlePress = async (event, item, index) => {
    console.log(
      "---------------------------------------------------------------------"
    );
    const favorites = defaultPlaylists["My Favorites"].songs;
    if (favorites.includes(item._id)) {
      // setHeartColor({ ...heartColor, [index]: "grey" });
      deleteSongFromFavorites({ song: item._id });
    } else {
      heartColor[index] = "red";
      setHeartColor([...heartColor]);
      // setHeartColor({ ...heartColor, [index]: "red" });
      addSongToFavorites({ song: item._id });
    }
  };

  const getPlaylistByName = async (playlistName) => {
    try {
      const res = await fetch(
        `http://192.168.0.135:3000/api/v1/playlists/playlistsByName?pname=${playlistName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
    } catch (error) {
      console.error("Error in getPlaylistByName:", error.message);
      return false; 
    }
  };

  // {navigation.navigate("Song", { song: item });}

  return (
    <View style={styles.container}>
      <Text style={styles.playlistCoteret}>{playlistName}</Text>
      <FlatList
        data={songlist}
        renderItem={({ item, index }) => (
          <View style={styles.viewItem}>
            <AntDesign
              name="heart"
              size={30}
              // color={isFavoriteSong(item._id)}
              color={heartColor[index]}
              style={styles.heartItem}
              onPress={(event) => handlePress(event, item, index)}
            />

            <View style={styles.songDeatails}>
              <Text
                style={styles.itemName}
                onPress={() => {
                  navigation.navigate("Song", { song: item });
                }}
              >
                {item.name}
              </Text>
              <Text
                style={styles.itemArtistName}
              >{`${item.artistCode?.firstName} ${item.artistCode?.lastName}`}</Text>
            </View>
            <View style={styles.imgItem}>
              <Image style={{ width: 70, height: 70 }} src={item.image} />
            </View>
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
    backgroundColor: "black",
  },
  playlistCoteret: {
    paddingLeft: 15,
    fontSize: 30,
    color: "purple",
    alignItems: "center",
  },
  item: {
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    // backgroundColor:'blue',
  },
  viewItem: {
    backgroundColor: "#fff",
    marginTop: 24,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 24,
    flexDirection: "row",

    justifyContent: "space-between",
  },
  itemArtistName: {
    fontSize: 15,
  },
  heartItem: {
    paddingLeft: 8,
  },

  imgItem: {
    width: 70,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  songDeatails: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
