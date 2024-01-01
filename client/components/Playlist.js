import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, LogBox, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { FormContext } from "../context/data";
import { AntDesign } from '@expo/vector-icons'; 

export default function Playlist({ navigation }) {
  const { songlist,playlistName } = useContext(FormContext);
  const[heartColor,setHeartColor]=useState('false');
 console.log(songlist);  

  useEffect(() => {
    console.log("songs:", songlist);
  }, []);


  const handlePress=()=>{
    setHeartColor(!heartColor);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.playlistCoteret}>
      {playlistName}
        
      </Text>
      <FlatList
        data={songlist}
        renderItem={({ item }) => (
          <View style={styles.viewItem} onPress={() => 
            {navigation.navigate("Song", { song: item });}}>
              <AntDesign name="heart" size={30} color={heartColor ? 'gray' : 'red'} style={styles.heartItem} onPress={handlePress}  />
             
              <View style={styles.songDeatails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemArtistName}>{item.name}</Text>
              </View>
              <View style={styles.imgItem}><Image style={{ width: 70, height: 70}} src={item.image} /></View>
            
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
    backgroundColor:"black"
  },
  playlistCoteret: {
    paddingLeft: 15,
    fontSize: 30,
    color:"purple",
    alignItems:"center"
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
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  itemName: {
   
    fontSize: 24,
    flexDirection: 'row', 

    justifyContent: 'space-between'
  },
  itemArtistName:{
    fontSize:15
  },
  heartItem: {
        paddingLeft:8
      },

  imgItem: {
    width: 70,
    height: 70,
    flexDirection: 'row',
     alignItems: 'center' 
    
  },
});
