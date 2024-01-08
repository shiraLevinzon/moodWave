import React, { useState, useRef, useContext, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera, isAvailableAsync } from "expo-camera";
import axios from "axios";
import * as ImageManipulator from "expo-image-manipulator";
import { FormContext } from "../context/data";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function CameraPage({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const { setSonglist, setPlaylistName } = useContext(FormContext);

  const cameraRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [feel, setfeel] = useState(null);

  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const askPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };
  const resizeImage = async (imageUri) => {
    try {
      const { uri } = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 300 } }],
        { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8 }
      );

      return uri;
    } catch (error) {
      console.error("Error while resizing image:", error);
      return imageUri; // Return the original image URI in case of an error
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const resizedImage = await resizeImage(photo.uri);
      setCapturedImage(photo);
      saveImage(resizedImage);
    }
  };

  const saveImage = async (imageUrl) => {
    try {
      console.log(imageUrl);
      const attributes =
        "gender,age,smiling,headpose,facequality,blur,eyestatus,emotion,ethnicity,beauty,mouthstatus,eyegaze,skinstatus";

      const formData = new FormData();
      formData.append("api_key", "3EB9Jf2tPI8VMfAnRpZuQez0f71U3N_d");
      formData.append("api_secret", "TYUAl3LU_FsoY5MqfhwQqA13TTuIMH5D");
      formData.append("image_file", {
        uri: imageUrl,
        name: "photo.jpg",
        type: "image/jpg",
      });
      formData.append("return_landmark", 2);
      formData.append("return_attributes", attributes);

      const response = await axios.post(
        "https://api-us.faceplusplus.com/facepp/v3/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 20000,
        }
      );

      const maxFeeling = findMaxFeeling(
        response.data.faces[0].attributes.emotion
      );
      setfeel({ feeling: maxFeeling });

      fetchSongsByEmo(maxFeeling);
      setPlaylistName(maxFeeling);
      console.log(maxFeeling);
      // Handle the result as needed
    } catch (error) {
      console.error("Error while saving image:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };
  const fetchSongsByEmo = async (emo) => {
    try {
      const response = await fetch(
        `http://192.168.0.179:3000/api/v1/songs/songByEmo/${emo}`
      );
      const data = await response.json();

      setSonglist(data);
      console.log(data);
      navigation.navigate("Playlist", { playlistFromTheList: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  const findMaxFeeling = (feelings) => {
    let maxFeeling = null;
    let maxValue = -Infinity;

    for (const [feeling, value] of Object.entries(feelings)) {
      if (value > maxValue) {
        maxValue = value;
        maxFeeling = feeling;
      }
    }

    return maxFeeling;
  };
  useEffect(() => {
    askPermission();
    console.log("bjmnb");
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        onCameraReady={askPermission}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            {/* <Text style={styles.text}>Take Picture</Text> */}
            <MaterialIcons
              name="enhance-photo-translate"
              size={54}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCameraType} style={styles.button}>
            <Ionicons name="ios-camera-reverse-sharp" size={24} color="black" />
            {/* <Text style={styles.text}>Toggle Camera</Text> */}
          </TouchableOpacity>
        </View>
      </Camera>
      {feel && (
        <View>
          <Text style={styles.playlistCoteret}>{feel.feeling}</Text>
        </View>
      )}
      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image
            source={{ uri: capturedImage.uri }}
            style={styles.previewImage}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    flex: 1,
    marginBottom: 128,
    marginTop: 128,
    marginLeft: 24,
    marginRight: 24,
    borderRadius: 5,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    margin: 20,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  previewContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
  },
  playlistCoteret: {
    fontSize: 24,
    fontWeight: "bold",
    // paddingTop:20,
    color: "white",
   alignItems:"center",
   justifyContent:"center",
   flexDirection: "row",
   textAlign:"center",
   borderColor: 'white',
    borderBottomWidth: 1, 
    borderTopWidth: 1,  
   
  },
});
