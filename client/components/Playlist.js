import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, LogBox, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FormContext } from "../context/data";
import { AntDesign } from "@expo/vector-icons";

export default function Playlist({ navigation }) {
  const { songlist, playlistName, likeSongList, setLikeSongList } =
    useContext(FormContext);
  const [heartColor, setHeartColor] = useState({});
  console.log(songlist);

  // useEffect(() => {
  //   console.log("songs:", songlist);
  // }, []);

  const handlePress = (item, index) => {
    setHeartColor((prevColors) => ({
      ...prevColors,
      [index]: !prevColors[index] || false,
    }));

    setLikeSongList({
      ...likeSongList,
      item,
    });

    console.log("the likeSongList is:", likeSongList);
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
              color={heartColor[index] ? "red" : "gray"}
              style={styles.heartItem}
              onPress={() => handlePress(item, index)}
            />

            <View style={styles.songDeatails}>
              <Text
                style={styles.itemName}
                onPress={() => {
                  console.log(item);
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
