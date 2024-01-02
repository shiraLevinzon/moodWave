import React, { useContext, useEffect, useState } from "react";

import { Alert, FlatList, StyleSheet, Text, Pressable, View } from "react-native";
// import DataContext from '../context/data'
import { FormContext } from "../context/data";
import { Button, Modal, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

export default function Search({ navigation }) {
  //  const [searchQuery, setSearchQuery] = useState('');
  const { searchQuery, setSearchQuery,songlist, setSonglist } = useContext(FormContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalResults, setModalResults] = useState([]);


  return (
     <View style={styles.centeredView}>
     <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
        style={{zIndex:10000}}
        >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
);
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalContainer:{
    },
  modalView: {flex:1,
    position: 'absolute', // Add this line
    top:0,
    left:0,
    // zIndex:10000,
    position: 'absolute', // Add this line
    margin: 0, // Set margin to 0
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 200,
    // zIndex:10000 // Set height to cover the entire screen
  },
  
  button: {
    borderRadius: 20,
     padding: 10,
    elevation: 2,
    backgroundColor:"red"
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});




// const styles = StyleSheet.create({

 
//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 22,
    
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 20,
//       height: 20,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: '#F194FF',
//   },
//   buttonClose: {
//     backgroundColor: '#2196F3',
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });
