import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { FormContext } from "../context/data";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

export default function Login({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(FormContext);
  const [loginData, setLoginData] = useState({});

  const getPlaylistByName = async (playlistName) => {
    try {
      // console.log(currentUser);
      const res = await fetch(
        `http://192.168.14.152:3000/api/v1/playlists/playlistsByName?pname=${playlistName}`,
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
      console.log(data);
      return data.length > 0;
    } catch (error) {
      console.error("Error in getPlaylistByName:", error.message);
      return false; // Return false on error
    }
  };

  const createDefoultPlaylists = async (playlistName) => {
    if (!getPlaylistByName(playlistName)) {
      const newPlaylist = {
        songs: [],
        name: playlistName,
      };
      const res = await fetch(
        `http://192.168.14.152:3000/api/v1/playlists/createPlaylist`,
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
        console.log("p1");
        console.log(errorData || "Non-JSON server error occurred");
      }
      const data = await res.json();
      console.log(data);
    }
  };

  const moveToHome = async () => {
    try {
      console.log(JSON.stringify(loginData));
      const res = await fetch(`http://192.168.14.152:3000/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "Non-JSON server error occurred");
      }
      const data = await res.json();
      setCurrentUser(data);
      console.log(data);

      createDefoultPlaylists("Heard Recently");
      createDefoultPlaylists("My Favorites");

      navigation.navigate("Menue");
    } catch (error) {
      console.error("Error occurred during fetch:", error);
      alert(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.loginCoteret}>MOOD WAVE</Text>
        <View style={styles.boxDeatails}>
          <Text style={styles.textLogin}>email:</Text>
          <TextInput
            style={styles.input}
            // keyboardType="email-address"
            value={loginData}
            onChangeText={(text) => setLoginData({ ...loginData, email: text })}
          />
          <Text style={styles.textLogin}>password:</Text>
          <TextInput
            style={styles.input}
            // keyboardType="visible-password"
            value={loginData}
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
