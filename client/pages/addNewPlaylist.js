import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function AddNewPlaylist() {
  const [allSongs, setAllSongs] = useState([]);

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = async () => {
    try {
      console.log(
        "-------------------------------------------------------------"
      );
      const res = await fetch(`http://192.168.0.179:3000/api/v1/songs`);
      const data = await res.json();
      console.log(data);
      setAllSongs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <View>
      <Text>CREATE YOUR PLAYLIST</Text>
      <FlatList
        data={allSongs}
        renderItem={(item) => (
          // (item) => console.log(item.item.image)
          <View style={styles.viewItem}>
            <Text style={styles.item}>{item.item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 24,
    padding: 30,
    fontSize: 24,
    // backgroundColor:'blue',
  },
  viewItem: {
    backgroundColor: "pink",
    marginTop: 24,
    marginHorizontal: 10,
  },
});
