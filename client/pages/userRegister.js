import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
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
        const errorData = await res.text();
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
    <View style={styles.container}>
      <Text style={styles.title}>User Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUserData({ ...userData, userName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setUserData({ ...userData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        onChangeText={(text) => setUserData({ ...userData, country: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Date"
        onChangeText={(text) => setUserData({ ...userData, birthDate: text })}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
});
