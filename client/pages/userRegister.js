import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { FormContext } from "../context/data";

export const UserRegister = ({ navigation }) => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    country: "",
    birthDate: "",
    role: "user",
  });

  const getToken = async (dataToLogin) => {
    try {
      const res = await fetch(`http://192.168.0.179:3000/api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToLogin),
      });
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || "server error occurred");
      }
      const data = await res.json();
      return data.token;
    } catch (error) {
      console.error("Error occurred during fetch:", error);
    }
  };

  const createDefoultPlaylists = async (playlistName, token) => {
    const newPlaylist = {
      name: playlistName,
    };

    const res = await fetch(
      `http://192.168.0.179:3000/api/v1/playlists/createPlaylist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPlaylist),
      }
    );
    if (!res.ok) {
      const errorData = await res.text();
      console.log(errorData.message || "server error occurred");
    }
    const data = await res.json();
  };

  const handleRegister = async () => {
    userData.birthDate = convertToDate(userData.birthDate);
    try {
      const response = await fetch(
        "http://192.168.0.128:3000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "server error occurred");
      }
      // const data = await response.json();

      const token = await getToken({
        email: userData.email,
        password: userData.password,
      });
      createDefoultPlaylists("Heard Recently", token);
      createDefoultPlaylists("My Favorites", token);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const convertToDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    const dateObject = new Date(year, month - 1, day);
    return dateObject;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.title}>User Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        onChangeText={(text) => setUserData({ ...userData, userName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="white"
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
        onChangeText={(text) => setUserData({ ...userData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        placeholderTextColor="white"
        onChangeText={(text) => setUserData({ ...userData, country: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Date"
        placeholderTextColor="white"
        onChangeText={(text) => setUserData({ ...userData, birthDate: text })}
      />
      
      <View style={styles.buttonContainer}>
        <Button title="Register" onPress={handleRegister} buttonStyle={styles.searchButton} containerStyle={styles.buttonContainerStyle}   titleStyle={styles.searchButtonText} />
      </View>
    </View>
   </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor:"black"
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
  buttonContainerStyle: {
    borderRadius: 10, // Set the border radius
    overflow: "hidden", // Ensure the border radius is applied correctly
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color:"purple"
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color:"white"
  },
});
