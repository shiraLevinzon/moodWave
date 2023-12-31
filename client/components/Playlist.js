import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { withNavigation } from "react-navigation";

export default function Playlist(props) {
  const { playlistFromTheList } = props;
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.playlistCoteret}>
        {/* {playlistFromTheList.playlistName} */}
        playlistFromTheList
      </Text>
      <FlatList
        data={playlistFromTheList}
        renderItem={() => (
          <View style={styles.viewItem}>
            <Text style={styles.item}>blablabla</Text>
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
    fontSize: 20,
  },
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
    width: 150,
  },
});
