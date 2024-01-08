import React, { useState ,useContext} from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FormContext } from "../context/data";

const ArtistLogin = ({navigation}) => {
  const { setCurrentUser } = useContext(FormContext);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.135:3000/api/v1/artists/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.status===201) {
        // Login successful, handle accordingly
        const data = await response.json();
        setCurrentUser(data);
        console.log(data);
        console.log('Artist logged in successfully');
        navigation.navigate("AddSong");
      } else {
        // Login failed, handle accordingly
        console.error('Failed to login artist:', response.statusText);
        alert("Failed to login artist");
      }
    } catch (error) {
      console.error('Error during artist login:', error);
    }
  };

 
  

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(text) => setLoginData({ ...loginData, email: text })}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
        onChangeText={(text) => setLoginData({ ...loginData, password: text })}
      />

      {/* Other login fields, if any */}

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});

export default ArtistLogin;
