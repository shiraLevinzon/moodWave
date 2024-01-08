import React, { useContext, useEffect, useState } from "react";
import { Button, Overlay } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
} from "react-native";
// import DataContext from '../context/data'
import { FormContext } from "../context/data";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
// import { debounce } from 'lodash';
import { KeyboardAvoidingView } from "react-native";

export default function Search({changePage}) {
  //  const [searchQuery, setSearchQuery] = useState('');
  const { searchQuery, setSearchQuery, songlist, setSonglist } =
    useContext(FormContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [heartColor, setHeartColor] = useState([]);

  
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState([]);

    // const debouncedSearch = debounce(handleSearch, 300);
  
    const openOverlay = async() => {
      setVisible(!visible);
      try {
        const response = await fetch(
          `http://192.168.0.135:3000/api/v1/songs/`
        );
        const data = await response.json();
        setSonglist(data);
        setFilter(data)
      } catch (error) {
        console.log(error.message);
      }
    };

  const closeOverlay = () => {
    setVisible(!visible);
  };


  const handleSearch = (text) => {
    // Update the searchQuery state directly
    setSearchQuery(text);

    // Filter the songlist based on the updated searchQuery
    const filteredList = songlist.filter(
      (song) =>
        song.name.toLowerCase().includes(text.toLowerCase()) ||
       `${song.artistCode?.firstName} ${song.artistCode?.lastName}`
          .toLowerCase()
          .includes(text.toLowerCase())
    );

    // Update the filteredSongList state
    setFilter(filteredList);
  };
  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery]);

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

  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button title="Search"  buttonStyle={styles.searchButton} containerStyle={styles.buttonContainerStyle}   titleStyle={styles.searchButtonText}  onPress={openOverlay} />
      </View>

      <Overlay isVisible={visible} onBackdropPress={openOverlay} style={styles.overlatView}>
        <Button
          title="back"
          buttonStyle={styles.searchButton} containerStyle={styles.buttonContainerStyle}   titleStyle={styles.searchButtonText}
          onPress={closeOverlay}
        />

        <KeyboardAvoidingView behavior="padding" style={styles.overlay}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="click song or artist..."
            value={searchQuery}
            // onChangeText={(text) => {
            //   setSearchQuery(text);
            //   handleSearch();
            // }}
            onChangeText={(text) => setSearchQuery(text)}
          />
          </View>
         
            <View style={styles.overlayContent}>

              <FlatList
                data={filter}
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
                           setVisible(!visible);
                          changePage(item)

                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={styles.itemArtistName}
                      >{`${item.artistCode?.firstName} ${item.artistCode?.lastName}`}</Text>
                    </View>
                    <View style={styles.imgItem}>
                      <Image
                        style={{ width: 70, height: 70 }}
                        src={item.image}
                      />
                    </View>
                  </View>
                )}
              />
            </View>
         
        </KeyboardAvoidingView>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({

  searchInput:{
    borderRadius:10,
 
    backgroundColor:"black",
     borderColor: 'white',
    borderWidth: 1, 
    borderWidth: 1,  
  },
  
  overlatView:{ backgroundColor: "black"},
  overlay: {
    width: 370,
    height: 600,
    backgroundColor: "black",
    color: "red",
  },
  buttonContainer: {
    backgroundColor: "purple",
    borderRadius: 10, // Set the border radius
    overflow: "hidden", // Ensure the border radius is applied correctly
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5, // Set the shadow for Android
  },

  searchButton: {
    backgroundColor: "purple",
    color:"black",
   
  },
  searchButtonText: {
    color: "black",
  },
  buttonContainerStyle: {
    borderRadius: 10, // Set the border radius
    overflow: "hidden", // Ensure the border radius is applied correctly
  },

  textOverlay: {
    fontSize: 20,
    color: "white",
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