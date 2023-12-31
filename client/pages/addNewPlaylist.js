import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

export default async function  AddNewPlaylist() {
const allSongs=[]; 

// try {
//     const res = await fetch(`http://192.168.0.128:3000/api/v1/songs`);
//     const data = await res.json();
//     console.log(data);
//     allSongs=data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
  return (
   <View>
    <Text>CREATE YOR PLAYLIST</Text>
    {/* <FlatList
        data={allSongs}
        renderItem={(item) => (
            <View style={styles.viewItem}>
              <Text style={styles.item}>{item.name}</Text>
            </View>
          )}
      /> */}
   </View>
  )
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
    width: 150,
  },
})