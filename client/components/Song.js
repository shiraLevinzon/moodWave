
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome5 } from '@expo/vector-icons';
import { ProgressBar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 


export const Song = ({ route }) => {
  const song = route.params?.song || 'Default Value';

  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState();
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [progressbar, setProgressbar] = useState(
    <ProgressBar progress={0} color="white" style={styles.progress} />
  );

  async function playSound() {
    if (!sound) {
      console.log('Loading Sound');
      const { sound: loadedSound } = await Audio.Sound.createAsync(
        require('../assets/shayach.mp3')
      );
      setSound(loadedSound);
      console.log('Playing Sound');
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
  }

  const updateStatus = async () => {
    const status = await sound?.getStatusAsync();
    setDuration(status?.durationMillis || 0);
    setPosition(status?.positionMillis || 0);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateStatus();
    }, 1000); // Update every 1000 milliseconds (1 second)

    return () => {
      clearInterval(intervalId);
    };
  }, [sound]);


useEffect(() => {
    if (isPlaying && !isNaN(duration) && !isNaN(position) && duration > 0) {
      const progress = (position / duration) * 100;
      setProgressbar(
        <ProgressBar
          progress={progress / 100}
          color="gray"
          style={styles.progress}
        />
      );
    }
  }, [position, duration, isPlaying]);
  
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
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
      <View style={styles.viewImgSong} ><Image style={styles.imgSong} src={song.image}/>
            <Text style={styles.nameSong}>{song.name}</Text>
            <Text style={styles.artistNameSong}>{song.name}</Text>
           </View>
          <View style={styles.addToPlaylist}><Feather name="more-horizontal" size={24} color="black" onPress={openOverlay} /></View>
      <View style={styles.controlButtons}>
  <TouchableOpacity onPress={seekBackward}>
 
  <MaterialIcons name="replay-10" size={40} color="#fff"  title="Forward 10s" />
    {/* <FontAwesome5 name="backward" size={35} color="black"  title="Backward 10s"/> */}
  </TouchableOpacity>

  <TouchableOpacity  onPress={playSound}>
        {isPlaying ? (
          <FontAwesome5 name="pause-circle" size={60} color="#fff" title="Pause Sound" />
        ) : (
          <FontAwesome5 name="play-circle" size={60} color="#fff" title="Play Sound" />
        )}
      </TouchableOpacity>

  <TouchableOpacity onPress={seekForward}>
  <MaterialIcons name="forward-10" size={40} color="#fff" title="Backward 10s" />
    {/* <FontAwesome5 name="forward" size={35} color="black" title="Forward 10s" /> */}
  </TouchableOpacity>
</View>
      <View style={styles.showDuration}>
      
       <Text style={{color:"#fff" }}>{formatTime(position)}</Text>
     <Text style={{color:"#fff" }}>{formatTime(duration)}</Text>
     </View>
      <View  style={styles.viewProgressbar}>{progressbar}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  },
  imgSong: {
    width: 300,
    height: 300,
  },
  viewImgSong: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingBottom: 120,
  },
  nameSong: {
    fontSize: 35,
    paddingTop: 20,
    color:"#fff" 
  },
  artistNameSong: {
    fontSize: 20,
    paddingTop: 20,
    color:"#fff" 
  },
  icon: {
    alignItems: 'center',
    paddingBottom:20
  },
  progress: {
    width: '90%',
    height: 20,
   
  },
  viewProgressbar:{
   paddingLeft:40,
   paddingBottom:20
  },
  showDuration:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: '90%',
    // margin:'auto'
    paddingLeft:40,
    paddingBottom:10,
    color:"#fff"

  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
