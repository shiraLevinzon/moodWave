import React, { useContext, useEffect, useState } from "react";
import { Button, Overlay } from 'react-native-elements';

import { Alert, FlatList, StyleSheet, Text, Image, View, ScrollView } from "react-native";
// import DataContext from '../context/data'
import { FormContext } from "../context/data";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { debounce } from 'lodash';
import { KeyboardAvoidingView} from "react-native";

export default function Search() {
  //  const [searchQuery, setSearchQuery] = useState('');
  const { searchQuery, setSearchQuery,songlist, setSonglist } = useContext(FormContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalResults, setModalResults] = useState([]);

  const navigation = useNavigation();
    const [visible, setVisible] = useState(false);
    const [filter, setFilter] = useState([]);

    // const debouncedSearch = debounce(handleSearch, 300);
  
    const toggleOverlay = async() => {
      setVisible(!visible);
      try {
        const response = await fetch(
          `http://192.168.0.128:3000/api/v1/songs/`
        );
        const data = await response.json();
        setSonglist(data);
        setFilter(data)
      } catch (error) {
        console.log(error.message);
      }
    };

    const closeOverlay=()=>{
      setVisible(!visible);
    }

    const handleSearch = () => {
      // Filter the songlist based on the searchQuery
      const filteredList = songlist.filter(
        (song) =>
          song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          `${song.artistCode?.firstName} ${song.artistCode?.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      // Update the filteredSongList state
      setFilter(filteredList);
    };




  return (
    <View>
    <View style={{backgroundColor:"purple", color:"black"}}><Button title="Search" onPress={toggleOverlay} /></View>
  
    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
    <KeyboardAvoidingView behavior="padding" style={styles.overlay}>
    <ScrollView>
    <View style={styles.overlayContent}>
  
          <FlatList
        data={filter}
        renderItem={({ item, index }) => (
          <View style={styles.viewItem}>
         
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
            <TextInput
        style={styles.searchInput}
        placeholder="click song or artist..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          handleSearch();
        }}
        
      />
        <Button title="close" onPress={closeOverlay} />
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Overlay>
  </View>

  )}

const styles = StyleSheet.create({

  overlay:{
    width:370,
    height:600,
    backgroundColor:"black",
    color:"red",
  
  },

  textOverlay:{
    fontSize:20,
    color:'white'
  },
  overlayContent: {
    flex: 1,
    marginTop: 20, // Adjust this value based on your design
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




