import React, { useContext } from "react";
import { Text, View, Image, StyleSheet, Button } from "react-native";
import { FormContext } from "../context/data";

export default function Profile({ navigation }) {
  const { currentUser, setCurrentUser } = useContext(FormContext);
  const pressHandler = () => {
    setCurrentUser({});
    navigation.navigate("login");
  };

  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.img}
        source={require(`../assets/default-profile.jpg`)}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{currentUser.user?.userName}</Text>
        <Text style={styles.details}>{currentUser.user?.email}</Text>
        <Text style={styles.details}>{currentUser.user?.country}</Text>
      </View>
      <Button style={styles.btn} title="Log Out" onPress={pressHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'black',
  },
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
    // fontWeight: "bold",
    // fontSize: 50,
    fontSize: 40,
    color: 'purple'
  },
  details: {
    fontSize: 20,
    color: 'purple'
  },
  btn: {
    // marginTop: 26,
    margin: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
