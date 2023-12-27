import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'; 
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Search from '../components/Search';

export default function Home() {

    const[categories,setCategories]=useState([
        {name:'hot', key:'1'},
        {name: 'pop', key:'2'},
        {name: 'israeli', key:'3'},
        {name: 'rock', key:'4'},
        {name: 'last', key:'5'},
        {name: 'soul', key:'6'},
    ]);
    // const [searchQuery, setSearchQuery] = useState('');

   


  return (
    <View style={styles.container}>
   <Search/>
    <Text style={styles.albomsCoteret}>OUR CATEGORIES</Text>
    <FlatList
    numColumns={2}
    data={categories}
    renderItem={({ item })=><View style={styles.viewItem}><Text style={styles.item}>{item.name}</Text></View>}
    />
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        paddingTop:40,
        paddingHorizontal:20
    },
    albomsCoteret:{
       paddingLeft:15,
        fontSize:20,
        
    },
    item:{
        marginTop:24,
        padding:30,
        fontSize:24,
        // backgroundColor:'blue',
    

    },
    viewItem:{
        backgroundColor:'red',
        marginTop:24,
        marginHorizontal:10,
       width:150
    },
  
    
});