import { createContext, useEffect, useState } from "react";

export const FormContext = createContext();

const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [playlistName, setPlaylistName] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [songlist, setSonglist] = useState([]);
  const [likeSongList, setLikeSongList] = useState({});
  const [defaultPlaylists, setDefaultPlaylists] = useState({
    "Heard Recently": "",
    "My Favorites": "",
  });

  const shared = {
    likeSongList,
    setLikeSongList,
    searchQuery,
    setSearchQuery,
    playlists,
    setPlaylists,
    songlist,
    setSonglist,
    currentUser,
    setCurrentUser,
    playlistName,
    setPlaylistName,
    defaultPlaylists,
    setDefaultPlaylists,
  };
  return <FormContext.Provider value={shared}>{children}</FormContext.Provider>;
};

export default Provider;
