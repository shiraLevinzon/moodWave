import React, { useState, useCallback } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import * as MediaLibrary from 'expo-media-library';
import * as DocumentPicker from 'expo-document-picker';



export default function AddSong() {
  const [songData, setSongData] = useState({
    name: "",
    duration: "",
    songUrl: null, // This will store the picked audio file URL
    emotion: "",
    image: "https://images.pexels.com/photos/16971942/pexels-photo-16971942/free-photo-of-black-and-white-picture-of-foamy-waves.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  });


var files = [
  {
    name: "file",
    filename: "file.jpg",
    filepath: DocumentDirectoryPath + "/file.jpg",
    filetype: "image/jpeg",
  },
];

uploadFiles({
  toUrl: "https://upload-service-url",
  files: files,
  method: "POST",
  headers: {
    Accept: "application/json",
  },
  
});

  const handleAudioSelection = async () => {
    try {
      const documentResult = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
      });
      //if (documentResult.type === 'success') {
        await setSongData({ ...songData, songUrl: documentResult });
        console.log(documentResult);
      //}
    } catch (err) {
      console.warn(err);
    }

  };

  const handlePress = async () => {

    const formData = new FormData();
    formData.append('name', songData.name);
    formData.append('duration', songData.duration);
    //formData.append('genres', songData.genres); // Convert to string if it's an array
    formData.append('emotion', songData.emotion);
    //formData.append('periodTag', songData.periodTag); // Convert to string if it's an array
    //console.log(songData);
    formData.append('audio',songData.songUrl.assets[0] );
    console.log(formData);

    try {
        const response = await fetch('http://192.168.0.128:3000/api/v1/songs', {
            method: 'POST',
            body: formData,
            headers: {
                 'Content-Type': 'multipart/form-data'
            }
        });

        // Check if the request was successful (status code in the range 200-299)
        if (response.status===200) {
            // Parse the response JSON if applicable
            const responseData = await response.json();
            console.log('Upload successful:', responseData);
        } else {
            // Handle errors
            console.error('Upload failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during fetch:', error);
    }
    
  }

  return (
    <View>
      <Text style={styles.title}>Add Song</Text>
      <TextInput
        style={styles.input}
        placeholder="name"
        onChangeText={(text) => setSongData({ ...songData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="duration"
        onChangeText={(text) => setSongData({ ...songData, duration: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Emotion"
        onChangeText={(text) => setSongData({ ...songData, emotion: text })}
      />

      {/* <StatusBar barStyle={'dark-content'}style={styles.input}/>
      {songData.songUrl && (
        <Text style={styles.uri} numberOfLines={1} ellipsizeMode={'middle'}>
        </Text>
      )} */}
      <Button style={styles.input} title="Select Audio 🎵" onPress={handleAudioSelection} >Select Audio 🎶 </Button>

      <Button style={styles.input} onPress={handlePress} >Add</Button>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
  },

});