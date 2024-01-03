import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FormContext } from "../context/data";
import { Modal, TextInput } from "react-native-paper";

export default function AddNewPlaylist({ navigation }) {
  const { currentUser, playlistName, setPlaylistName } =
    useContext(FormContext);
  const [allSongs, setAllSongs] = useState([]);
  const [songArr, setSongArr] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getSongs();
  }, []);

  const getSongs = async () => {
    try {
      console.log(
        "-------------------------------------------------------------"
      );
      const res = await fetch(`http://192.168.0.128:3000/api/v1/songs`);
      const data = await res.json();
      console.log(data);
      setAllSongs(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToPlaylist = (song) => {
    const id = song.item._id;
    setSongArr([...songArr, id]);
  };

  const giveName = () => {
    setModalVisible(true);
  };

  const createPlaylist = async () => {
    const newPlaylist = {
      songs: songArr,
      name: playlistName.name,
    };
    const res = await fetch(
      `http://192.168.0.128:3000/api/v1/playlists/createPlaylist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(newPlaylist),
      }
    );
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "server error occurred");
    }
    const data = await res.json();
    console.log(data);
  };

  return (
    <View style={styles.allPage}>
      <Text style={styles.coteretCreate}>CREATE YOUR PLAYLIST</Text>

      <Button color="purple" title="Create" onPress={giveName} />

      <FlatList
        data={allSongs}
        renderItem={(item) => (
          <View style={styles.viewItem}>
            <AntDesign
              style={styles.plusItem}
              name="pluscircleo"
              size={40}
              color="black"
              onPress={() => addToPlaylist(item)}
            />

            <View style={styles.songDeatails}>
              <Text style={styles.itemName}>{item.item.name}</Text>
              <Text
                style={styles.itemArtistName}
              >{`${item.item.artistCode?.firstName} ${item.item.artistCode?.lastName}`}</Text>
            </View>

            <View style={styles.imgItem}>
              <Image style={{ width: 70, height: 70 }} src={item.item.image} />
            </View>
          </View>
        )}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>CHOOSE NAME:</Text>
            <TextInput
              // style={styles.input}

              value={playlistName}
              onChangeText={(name) =>
                setPlaylistName({ ...playlistName, name })
              }
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                createPlaylist();
                navigation.navigate("MyPlaylist");
              }}
            >
              <Text style={styles.textStyle}>SAVE</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  songDeatails: { flex: 1, justifyContent: "center", alignItems: "center" },

  allPage: {
    flex: 1,
    backgroundColor: "black",
  },

  coteretCreate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    textAlign: "center",
    fontSize: 23,
    color: "purple",
    fontWeight: "bold",
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
    // marginTop: 24,
    // padding: 30,
    fontSize: 24,
    // backgroundColor:'blue',
  },
  itemArtistName: {
    fontSize: 15,
  },

  imgItem: {
    width: 70,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  plusItem: { paddingLeft: 8 },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
