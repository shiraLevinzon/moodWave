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
            <Text style={styles.loginCoteret}>Firs, login</Text>
            <View>
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
                <Button  onPress={moveToHome}>Menue</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    loginCoteret: {
        paddingLeft: 15,
        fontSize: 20,
    },
    textLogin: {

    },
    input: {
        flex: 1,
        height: 20,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        marginLeft: 10, // Adjusted to add some space between icon and input
      },
});
