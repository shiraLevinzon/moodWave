import React, { useContext, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
// import DataContext from '../context/data'
import { FormContext } from "../context/data";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
export default function Search() {
  //  const [searchQuery, setSearchQuery] = useState('');
  const { searchQuery, setSearchQuery } = useContext(FormContext);

  return (
    <View style={styles.searchContainer}>
      {/* <Ionicons name="search" size={20} color="black" style={styles.icon} /> */}
      <TextInput
        style={styles.input}
        placeholder="Search Song..."
        value={searchQuery}
        //   onChangeText={(text) => setSearchQuery(text)}
        //   onSubmitEditing={handleSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  icon: {
    padding: 10,
  },
  input: {
    flex: 1,
    height: 20,
    width:80,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    marginLeft: 10, // Adjusted to add some space between icon and input
  },
});
