import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import Search from "../components/Search";

export default function Home() {
  const [categories, setCategories] = useState([
    { name: "hot", key: "1" },
    { name: "pop", key: "2" },
    { name: "israeli", key: "3" },
    { name: "rock", key: "4" },
    { name: "last", key: "5" },
    { name: "soul", key: "6" },
  ]);
  // const [searchQuery, setSearchQuery] = useState('');

  const [ganers, setGaners] = useState([
    "Rock",
    "Pop",
    "Hip Hop",
    "Jazz",
    "Blues",
    "Country",
    "Electronic",
    "Classical",
    "Metal",
    "Funk",
    "Soul",
    "Rap",
    "Mizrahi",
    "Israeli",
  ]);

  const selectGaner = () => {
    console.log("selectGaner");
    // Alert.alert("selectPlaylist")
    //navigation.navigate("Playlist");
  };

  const viewGaner = (item) => {
    return (
      <View style={styles.viewItem}>
        <Text onPress={selectGaner} style={styles.item}>
          {item}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Search />
      <Text style={styles.albomsCoteret}>OUR CATEGORIES</Text>
      <FlatList
        numColumns={2}
        data={ganers}
        renderItem={({ item }) => viewGaner(item)}
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
  albomsCoteret: {
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
    backgroundColor: "red",
    marginTop: 24,
    marginHorizontal: 10,
    width: 150,
  },
});
