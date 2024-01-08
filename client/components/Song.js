import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { FontAwesome5 } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { FormContext } from "../context/data";

export const Song = ({ route }) => {
  const song = route.params?.song || "Default Value";
  const [volume, setVolume] = useState(1); // Initial volume

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const { defaultPlaylists, currentUser } = useContext(FormContext);
  // const [progressbar, setProgressbar] = useState(
  //   <ProgressBar progress={0} color="white" style={styles.progress} />
  // );

  const [progressbar, setProgressbar] = useState(
    <Slider
      style={styles.progress}
      minimumValue={0}
      maximumValue={1}
      value={0}
      minimumTrackTintColor="purple"
      maximumTrackTintColor="white"
      thumbTintColor="purple"
      onValueChange={handleSliderChange}
    />
  );




  useEffect(() => {
    if (defaultPlaylists["Heard Recently"].songs.length >= 10)
      deleteFromHeardRecently(defaultPlaylists["Heard Recently"].songs[0]);
    addToHeardRecently();
  }, []);

  const addToHeardRecently = async () => {
    console.log("jjj");
    const songToAdd = { song: song._id };
    const res = await fetch(
      `http://192.168.0.135:3000/api/v1/playlists/${defaultPlaylists["Heard Recently"]._id}/addSong`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(songToAdd),
      }
    );
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "server error occurred");
    }
    const data = await res.json();
  };

  const deleteFromHeardRecently = async (songToDel) => {
    const songToDelete = { song: songToDel };
    const res = await fetch(
      `http://192.168.0.135:3000/api/v1/playlists/${defaultPlaylists["Heard Recently"]._id}/deleteSong`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify(songToDelete),
      }
    );
    if (!res.ok) {
      const errorData = await res.text();
      throw new Error(errorData || "server error occurred");
    }
    const data = await res.json();
  };

  const playSound = async () => {
    if (!sound) {
      console.log("Loading Sound");
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        {uri: song.songUrl}
      );
      setSound(loadedSound);
      console.log("Playing Sound");
      await loadedSound.playAsync();
      updateStatus(); // Initial update
    } else {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    }

    setIsPlaying(!isPlaying);
  };

  const updateStatus = async () => {
    const status = await sound?.getStatusAsync();
    setDuration(status?.durationMillis || 0);
    setPosition(status?.positionMillis || 0);
  };

  const handleSliderChange = async (value) => {
    if (!sound) return;

    const newPosition = value * duration;
    await sound?.setPositionAsync(newPosition);
    updateStatus();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateStatus();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [sound]);

  useEffect(() => {
    if (isPlaying && !isNaN(duration) && !isNaN(position) && duration > 0) {
      const progress = (position / duration) * 100;
      setProgressbar(
        <Slider
          style={styles.progress}
          minimumValue={0}
          maximumValue={1}
          value={progress / 100}
          minimumTrackTintColor="purple"
          maximumTrackTintColor="white"
          thumbTintColor="purple"
          onValueChange={handleSliderChange}
        />
      );
    }
  }, [position, duration, isPlaying]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const seekBackward = async () => {
    const newPosition = Math.max(position - 10000, 0); // Seek 10 seconds backward
    await sound.setPositionAsync(newPosition);
    updateStatus();
  };

  const seekForward = async () => {
    const newPosition = Math.min(position + 10000, duration); // Seek 10 seconds forward
    await sound.setPositionAsync(newPosition);
    updateStatus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewImgSong}>
        <Image style={styles.imgSong} src={song.image} />
        <Text style={styles.nameSong}>{song.name}</Text>
        <Text style={styles.artistNameSong}>{song.name}</Text>
      </View>

      <View style={styles.addToPlaylist}>
        <Feather name="more-horizontal" size={24} color="black" />
      </View>
      <View style={styles.controlButtons}>
        <TouchableOpacity onPress={seekBackward}>
          <MaterialIcons
            name="replay-10"
            size={40}
            color="#fff"
            title="Forward 10s"
          />
          {/* <FontAwesome5 name="backward" size={35} color="black"  title="Backward 10s"/> */}
        </TouchableOpacity>

        <TouchableOpacity onPress={playSound}>
          {isPlaying ? (
            <FontAwesome5
              name="pause-circle"
              size={60}
              color="#fff"
              title="Pause Sound"
            />
          ) : (
            <FontAwesome5
              name="play-circle"
              size={60}
              color="#fff"
              title="Play Sound"
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={seekForward}>
          <MaterialIcons
            name="forward-10"
            size={40}
            color="#fff"
            title="Backward 10s"
          />
          {/* <FontAwesome5 name="forward" size={35} color="black" title="Forward 10s" /> */}
        </TouchableOpacity>
      </View>
      <View style={styles.showDuration}>
        <Text style={{ color: "#fff" }}>{formatTime(position)}</Text>
        <Text style={{ color: "#fff" }}>{formatTime(duration)}</Text>
      </View>
      <TouchableOpacity onPress={(e) => handleProgressBarPress(e)}>
        <View style={styles.viewProgressbar}>{progressbar}</View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imgSong: {
    width: 300,
    height: 300,
  },
  viewImgSong: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 120,
  },
  nameSong: {
    fontSize: 35,
    paddingTop: 20,
    color: "#fff",
  },
  artistNameSong: {
    fontSize: 20,
    paddingTop: 20,
    color: "#fff",
  },
  icon: {
    alignItems: "center",
    paddingBottom: 20,
  },
  progress: {
    width: "90%",
    height: 20,
    width: "90%",
    height: 10,
  },
  viewProgressbar: {
    paddingLeft: 40,
    paddingBottom: 20,
  },
  showDuration: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    // margin:'auto'
    paddingLeft: 40,
    paddingBottom: 10,
    color: "#fff",
  },
  controlButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
});