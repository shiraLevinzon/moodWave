import { createContext,  useEffect,  useState } from "react";


const FormContext = createContext()

const Provider = ({children})=>{

    
  
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
  
  const shared = {searchQuery, setSearchQuery,playlists, setPlaylists,songlist,setSonglist}
  return (
    <FormContext.Provider value={shared}>
        {children}
    </FormContext.Provider>
  )
}


export {Provider}
export default FormContext