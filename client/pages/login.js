import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { FormContext } from "../context/data";

export default function Login({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(FormContext);
  const [loginData, setLoginData] = useState({});

  const moveToHome = async () => {
    try {
      console.log(JSON.stringify(loginData));
      const res = await fetch(`http://192.168.0.179:3000/api/v1/users/login`, {
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
      navigation.navigate("Menue");
    } catch (error) {
      console.error("Error occurred during fetch:", error);
      alert(error);
    }
  };

  return (
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
          <Button onPress={()=>{navigation.navigate("UserRegister")}}>
            <Text  style={styles.btnLogin}>Register</Text>
          </Button>
        </View>
      </View>
    </View>
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
