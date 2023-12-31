import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import FormContext from  '../context/data';

import { withNavigation } from "react-navigation";

export default function Playlist({navigation}) {
  
  const {songlist} = useContext(FormContext);
  console.log(songlist);

  //const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.playlistCoteret}>
        {/* {playlistFromTheList.playlistName} */}
      </Text>
      <FlatList
        data={songlist}
        renderItem={({ item }) => (
          <View style={styles.viewItem}>
            <Text onPress={()=>{      
              navigation.navigate("Song", { song: item  });}
              } style={styles.item}>{item.name}</Text>
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
