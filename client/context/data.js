import { createContext, useEffect, useState } from "react";


export const FormContext = createContext();

const Provider = ({children})=>{    
  const [currentUser, setCurrentUser] = useState({});

  
    const [searchQuery, setSearchQuery] = useState('');
    const [playlists, setPlaylists] = useState([
      {
        playlistName:'test1 playlist',
        songs:[{name:'bla'},{name:'lala'}],
        participants:['lea','rina']
       },
       {
         playlistName:'test2 playlist',
         songs:[{name:'lili'},{name:'lola'}],
         participants:['avi','dani']
        },
   ]);
   const [songlist, setSonglist] = useState([])
 
 const shared = {searchQuery, setSearchQuery,playlists, setPlaylists,songlist,setSonglist,currentUser,
  setCurrentUser,}
  return (
    <FormContext.Provider value={shared}>
        {children}
    </FormContext.Provider>
  )
}


export default Provider;
