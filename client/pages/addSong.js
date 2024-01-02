import React from "react";
import { View } from "react-native";

export default function AddSong() {
  return (
    <View>
      <Text style={styles.title}>User Registration</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        // onChangeText={(text) => setUserData({ ...userData, userName: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        // onChangeText={(text) => setUserData({ ...userData, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        // onChangeText={(text) => setUserData({ ...userData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Country"
        // onChangeText={(text) => setUserData({ ...userData, country: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Birth Date"
        // onChangeText={(text) => setUserData({ ...userData, birthDate: text })}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
