import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function Playlist(props) {
  const {playlistFromTheList}=props
  return (
    <View style={styles.container} >
        <Text style={styles.playlistCoteret} >{playlistFromTheList.playlistName}</Text>
        <FlatList
        data={playlistFromTheList.songs}
        renderItem={({ item })=><View style={styles.viewItem} ><Text style={styles.item}>{item.songName}</Text></View>}
        />
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:40,
        paddingHorizontal:20
    },
    playlistCoteret:{
       paddingLeft:15,
        fontSize:20,
        
    },
    item:{
        marginTop:24,
        padding:30,
        fontSize:24,
        // backgroundColor:'blue',
    
  
    },
    viewItem:{
        backgroundColor:'pink',
        marginTop:24,
        marginHorizontal:10,
       width:150
    },
  
    
  });