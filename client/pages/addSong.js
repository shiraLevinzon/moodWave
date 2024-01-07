import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { Button, Text, TextInput, Checkbox } from "react-native-paper";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { SelectList, MultipleSelectList } from 'react-native-dropdown-select-list'
import { AntDesign } from '@expo/vector-icons';
import { FormContext } from "../context/data";



export default function AddSong() {
  const { currentUser } = useContext(FormContext);
  const [songData, setSongData] = useState({
    name: "",
    duration: "",
    songUrl: "", // This will store the picked audio file URL
    emotion: "",
    genres: [],
    periodTag: [],
    image: ""
  });
  const [audio, setAudio] = useState(null);
  const [selectedGen, setSelectedGen] = React.useState([]);
  const [selectedTag, setSelectedTag] = React.useState([]);
  const [uploadStatus, setUploadStatus] = React.useState(''); // To track upload status

  useEffect(() => {
    // This effect will run whenever songData.songUrl changes
    if (songData.songUrl) {
      // If songUrl is available, perform the database update
      handleDatabaseUpdate();
    }
  }, [songData.songUrl]);

  const dataEmo = [
    { key: '1', value: 'anger' },
    { key: '2', value: 'fear' },
    { key: '3', value: 'happiness' },
    { key: '4', value: 'neutral' },
    { key: '5', value: 'sadness' },
    { key: '6', value: 'surprise' },
    { key: '7', value: 'disgust' },
  ]
  const dataGenges = [
    { key: '1', value: 'Pop' },
    { key: '2', value: 'Rock' },
    { key: '3', value: 'Hip Hop' },
    { key: '4', value: 'Electronic' },
    { key: '5', value: 'Country' },
    { key: '6', value: 'Jazz' },
    { key: '7', value: 'Blues' },
    { key: '8', value: 'Classical' },
    { key: '9', value: 'Metal' },
    { key: '10', value: 'Funk' },
    { key: '11', value: 'Soul' },
    { key: '12', value: 'Rap' },
    { key: '13', value: 'Mizrahi' },
    { key: '14', value: 'Israeli' },
  ]


  const dataTags = [
    { key: '1', value: 'summer' },
    { key: '2', value: 'winter' },
    { key: '3', value: 'spring' },
    { key: '4', value: 'none' },
    { key: '5', value: 'clear sky' },
    { key: '6', value: 'few clouds' },
    { key: '7', value: 'scattered clouds' },
    { key: '8', value: 'broken clouds' },
    { key: '9', value: 'shower rain' },
    { key: '10', value: 'rain' },
    { key: '11', value: 'thunderstorm' },
    { key: '12', value: 'snow' },
    { key: '13', value: 'mist' },
  ];



  const handleAudioSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
        copyToCacheDirectory: false,
        // base64: true
      });

      //if (result.type === 'success') {
      setAudio(result.assets[0]);
      //console.log(result);
      //} else {
      //alert('Document picking cancelled');
      // }
    } catch (error) {
      console.error('Error picking document:', error);
    }


  };


  const handlePress = async () => {
    if (audio) {
      console.log('Audio URI:', audio.uri);
      try {
        const contentUri = audio.uri;
        const localUri = `${FileSystem.documentDirectory}audio_file.mp3`;

        await FileSystem.copyAsync({
          from: contentUri,
          to: localUri,
        });

        const fileContent = await FileSystem.readAsStringAsync(localUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const formData = new FormData();
        formData.append('file', `data:audio/mpeg;base64,${fileContent}`);
        formData.append('upload_preset', 'ml_default');

        try {
          const response = await fetch(
            'https://api.cloudinary.com/v1_1/di1wl9x9l/upload',
            {
              method: 'POST',
              body: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );

          const data = await response.json();
          console.log(data.secure_url);
          setSongData({ ...songData, songUrl: data.secure_url })
          setUploadStatus('Uploaded successfully');

          console.log('Upload success:', data);
        } catch (error) {
          console.error('Upload error:', error);
        }
      } catch (error) {
        console.error('Error reading file content:', error);
      }
    }
  };


  const handleDatabaseUpdate = async () => {
    console.log(JSON.stringify(songData));

      try {
        const response = await fetch('http://192.168.0.135:3000/api/v1/songs', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          body: JSON.stringify(songData),

        });

        // Check if the request was successful (status code in the range 200-299)
        if (response.status === 201) {
          // Parse the response JSON if applicable
          const responseData = await response.json();
          console.log('Upload successful:', responseData);
          alert("the song added successfuly")
        } else {
          // Handle errors
          console.error('Upload failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
}

  return (
    <View style={styles.container}>

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

      <SelectList
        setSelected={(val) => setSongData({ ...songData, emotion: val })}
        data={dataEmo}
        save="value"
        label="Emotion"
      />
      <MultipleSelectList
        setSelected={(val) => setSelectedGen(val)}
        data={dataGenges}
        save="value"
        onSelect={() => setSongData({ ...songData, genres: selectedGen })}
        label="Genres"
      />
      <MultipleSelectList
        setSelected={(val) => setSelectedTag(val)}
        data={dataTags}
        save="value"
        onSelect={() => setSongData({ ...songData, periodTag: selectedTag })}
        label="Tags"
      />
      <TextInput
        style={styles.input}
        placeholder="Image"
        onChangeText={(text) => setSongData({ ...songData, image: text })}
      />
      { }



      <Button style={styles.button} title="Select Audio 🎵" onPress={handleAudioSelection} >Select Audio 🎶 </Button>
      {audio && (
        <Text style={styles.uploadedText} numberOfLines={1} ellipsizeMode={'middle'}>
          uploaded
          <AntDesign name="checkcircle" size={24} color="green" />
        </Text>
      )}
        <Button style={styles.button} onPress={handlePress} >Add</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: '#333',
  },
  statusBar: {
    marginBottom: 15,
  },
  uploadedText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'green',
  },
  button: {
    marginBottom: 15,
    backgroundColor: '#ddd',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

});