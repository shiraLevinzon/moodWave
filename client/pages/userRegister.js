import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

export const UserRegister = ({ navigation }) => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
    country: "",
    birthDate: "",
    role: "user",
  });

  const handleRegister = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.135:3000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        // Registration successful, navigate to login page
        navigation.navigate("Login");
      } else {
        // Handle registration failure
        const errorData = await response.json();
        Alert.alert("Registration Failed", errorData.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
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
