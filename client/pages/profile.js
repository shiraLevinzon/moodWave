import React from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";

export default function Profile() {
  const pressHandler = () => {
    alert("go to login page");
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require("../assets/default-profile.jpg")}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Full Name</Text>
        <Text style={styles.details}>full.name@gmail.com</Text>
        <Text style={styles.details}>country</Text>
      </View>
      <Button style={styles.btn} title="Log Out" onPress={pressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
  },
  details: {
    fontSize: 20,
  },
  btn: {
    marginTop: 26,
  },
});
