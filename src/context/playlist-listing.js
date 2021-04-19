import { createContext, useContext, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { useVideoList } from "./video-listing";

const PlaylistContext = createContext();

export function useHistoryList() {
  return useContext(PlaylistContext);
}

export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, {
    listOfPlaylists,
  });

  const { setRoute } = useVideoList();
  const [playlistToRender, setPlaylistToRender] = useState({});

  function Playlists() {
    
    return (
      <div className="component-container card-div">
        {" "}
        {state.listOfPlaylists.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              border: "1px solid",
              margin: "1rem",
              padding: "1rem",
            }}
          >
            {item.title} <br />
            Number of videos: {item.videos.length} <br />
            <button
              onClick={() => {
                setPlaylistToRender(item);
                setRoute("Playlists");
              }}
            >
              {" "}
              Open playlist{" "}
            </button>{" "}
          </div>
        ))}{" "}
      </div>
    );
  }

  function Playlist() {
    return (
      <div className="component-container card-div">
        {" "}
        {playlistToRender.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              border: "1px solid",
              margin: "1rem",
              padding: "1rem",
            }}
          >
            <img
              src={item.videos.imageUrl}
              style={{
                width: "100%",
              }}
              alt=""
            />
            <button onClick={() => {}}> Open </button>{" "}
            <button onClick={() => console.log("clicked add")}> Unlike </button>{" "}
          </div>
        ))}{" "}
      </div>
    );
  }

  return (
    <PlaylistContext.Provider
      value={{
        listOfPlaylists: state.listOfPlaylists,
        dispatch,
        Playlist,
      }}
    >
      {children}{" "}
    </PlaylistContext.Provider>
  );
}

const listOfPlaylists = [];

function playlistReducer(state, action) {
  let currentPlaylist = null;
  switch (action.type) {
    case "ADD_NEW_PLAYLIST":
      currentPlaylist = {
        id: action.payload.id ? action.payload.id : uuid(),
        title: action.payload.title,
        videos: [],
      };
      return {
        ...state,
        playlists: [...state.playlists, currentPlaylist],
      };

    case "ADD_TO_PLAYLIST":
      if (
        state.listOfPlaylists.filter((item) => item.id === action.payload.id)
          .length > 0
      ) {
        return {
          ...state,
        };
      }
      return {
        ...state,
        listOfPlaylists: state.listOfPlaylists.concat(action.payload),
      };
    default:
      return {
        ...state,
      };
  }
}
