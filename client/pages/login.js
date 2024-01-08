import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { FormContext } from "../context/data";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Image } from "react-native-elements";

export default function Login({ navigation }) {
  const { currentUser, setCurrentUser, defaultPlaylists, setDefaultPlaylists } =
    useContext(FormContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  // const getPlaylistByName = async (playlistName) => {
  //   console.log("get");
  //   try {
  //     const res = await fetch(
  //       `http://192.168.0.179:3000/api/v1/playlists/playlistsByName?pname=${playlistName}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${currentUser.token}`,
  //         },
  //       }
  //     );
  //     if (!res.ok) {
  //       throw new Error(`Server error: ${res.status} ${res.statusText}`);
  //     }
  //     const data = await res.json();
  //     console.log(data.length);
  //     return data.length > 0;
  //   } catch (error) {
  //     console.error("Error in getPlaylistByName:", error.message);
  //     return false; // Return false on error
  //   }
  // };

  // const createDefoultPlaylists = async (playlistName) => {
  //   console.log("create");
  //   if (!(await getPlaylistByName(playlistName))) {
  //     const newPlaylist = {
  //       name: playlistName,
  //     };
  //     const res = await fetch(
  //       `http://192.168.0.179:3000/api/v1/playlists/createPlaylist`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${currentUser.token}`,
  //         },
  //         body: JSON.stringify(newPlaylist),
  //       }
  //     );
  //     if (!res.ok) {
  //       const errorData = await res.text();
  //       console.log(errorData.message || "server error occurred");
  //     }
  //     const data = await res.json();
  //     console.log("check", { newPlaylist: data._id });
  //     setDefaultPlaylits({ newPlaylist: data._id });
  //     console.log(setDefaultPlaylits);
  //     console.log(data);
  //   }
  // };

  useEffect(() => {
    const updateDefaultsPlaylists = async () => {
      // console.log("current is change");
      console.log(!currentUser.token);
      if (!currentUser.token) return;

      const heardRecently = await getDefaultPlaylistsId("Heard Recently");
      const myFavorites = await getDefaultPlaylistsId("My Favorites");
      setDefaultPlaylists({
        ["Heard Recently"]: heardRecently,
        ["My Favorites"]: myFavorites,
      });
    };
    updateDefaultsPlaylists();
  }, [currentUser]);

  const getDefaultPlaylistsId = async (playlistName) => {
    // console.log("getdefault");
    try {
      const res = await fetch(
        `http://192.168.0.179:3000/api/v1/playlists/playlistsByName?pname=${playlistName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error(`Server error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      console.log(data[0]);
      return data[0]; //return data[0]._id
    } catch (error) {
      console.error("Error in getDefaultPlaylistsId:", error.message);
      return false; // Return false on error
    }
  };

  const moveToHome = async () => {
    try {
      const res = await fetch(`http://192.168.0.179:3000/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "server error occurred");
      }
      const data = await res.json();
      console.log(data);
      setCurrentUser(data);

      // const heardRecently = await getDefaultPlaylistsId("Heard Recently");
      // const myFavorites = await getDefaultPlaylistsId("My Favorites");
      // setDefaultPlaylists({
      //   ["Heard Recently"]: heardRecently,
      //   ["My Favorites"]: myFavorites,
      // });

      navigation.navigate("Menue");
    } catch (error) {
      console.error("Error occurred during fetch:", error);
      alert(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.viewImgAndMood}>
          <Text style={styles.loginCoteret}>MOOD WAVE</Text>
          <ImageBackground
            source={{
              uri: "https://images.pexels.com/photos/1202130/pexels-photo-1202130.jpeg?auto=compress&cs=tinysrgb&w=600",
            }}
            imageStyle={styles.imgSong}
          />
        </View>
        <View style={styles.boxDeatails}>
          <Text style={styles.textLogin}>email:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            value={loginData.email}
            onChangeText={(text) => setLoginData({ ...loginData, email: text })}
          />
          <Text style={styles.textLogin}>password:</Text>
          <TextInput
            style={styles.input.stringValue}
            keyboardType="visible-password"
            value={loginData.password}
            onChangeText={(text) =>
              setLoginData({ ...loginData, password: text })
            }
          />
          <View style={styles.viewLogin}>
            <Button onPress={moveToHome}>
              <Text style={styles.btnLogin}>Login</Text>
            </Button>
            <Button
              onPress={() => {
                navigation.navigate("UserRegister");
              }}
            >
              <Text style={styles.btnLogin}>Register</Text>
            </Button>

            <Button
              onPress={() => {
                navigation.navigate("ArtistRegistration");
              }}
            >
              <Text style={styles.btnLogin}>Enter As Artist</Text>
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  viewImgAndMood: {
    flexDirection: "row",
  },
  imgSong: {
    width: 100,
    height: 132,
    marginTop: 60,
    marginLeft: 20,
  },
  loginCoteret: {
    fontSize: 20,
    paddingTop: 50,
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    fontSize: 60,
    color: "purple",
    fontWeight: "bold",
  },
  boxDeatails: {
    paddingTop: 30,
  },
  textLogin: {
    paddingLeft: 10,
    fontSize: 19,
    paddingBottom: 10,
    paddingTop: 10,
    color: "#777",
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
  },

  btnLogin: {
    color: "purple",
    fontWeight: "bold",
    fontSize: 20,
    paddingTop: 10,
  },
  viewLogin: { paddingTop: 50 },
});
