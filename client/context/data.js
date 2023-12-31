import { createContext, useEffect, useState } from "react";

export const FormContext = createContext();

const Provider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [playlists, setPlaylists] = useState([
    {
      playlistName: "test1 playlist",
      songs: [{ songName: "bla" }, { songName: "lala" }],
      participants: ["lea", "rina"],
    },
    {
      playlistName: "test2 playlist",
      songs: [{ songName: "lili" }, { songName: "lola" }],
      participants: ["avi", "dani"],
    },
  ]);

  const shared = {
    searchQuery,
    setSearchQuery,
    playlists,
    setPlaylists,
    currentUser,
    setCurrentUser,
  };
  return <FormContext.Provider value={shared}>{children}</FormContext.Provider>;
};

// export { Provider };
// export default FormContext;

export default Provider;
