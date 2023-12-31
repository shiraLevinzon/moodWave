import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper';

export default function Login({navigation}) {

    const [loginData, setLoginData] = useState({});

    const moveToHome=()=>{
        console.log("moveToHome");
        navigation.navigate("Menue")
    }

    return (
        <View style={styles.container}>
            <Text style={styles.loginCoteret}>MOOD WAVE</Text>
            <View style={styles.boxDeatails}>
                <Text style={styles.textLogin}>email:</Text>
                <TextInput
                    style={styles.input}
                    // keyboardType={email-address}
                    value={loginData}
                //   onChangeText={(text) => setSearchQuery(text)}
                //   onSubmitEditing={handleSearch}
                />
                <Text style={styles.textLogin}>password:</Text>
                <TextInput
                    style={styles.input}
                    // keyboardType={visible-password}
                    value={loginData}
                //   onChangeText={(text) => setSearchQuery(text)}
                //   onSubmitEditing={handleSearch}
                />
              <Button  onPress={moveToHome}><Text style={styles.btnLogin}>Login</Text></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    loginCoteret: {
        
        fontSize: 20,
        paddingTop:50,
        display:'flex',
        alignItems:'center',
        textAlign:'center',
        fontSize:60,
        color:"purple",
        fontWeight:'bold'
    },
    boxDeatails:{
   paddingTop:30
    },
    textLogin: {
     paddingLeft:10,
     fontSize:19,
     paddingBottom:10,
     paddingTop:10,
     color:"#777"
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginLeft: 10, // Adjusted to add some space between icon and input,
        
      },
      btnLogin:{
        color:"purple",
        fontWeight:'bold',
        fontSize:20,
        paddingTop:10
      },
});
