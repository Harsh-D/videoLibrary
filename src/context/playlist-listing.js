import { createContext, useContext, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { useVideoList } from "./video-listing";
import { useHistoryList } from "./history-listing";
const PlaylistContext = createContext();

export function usePlaylist() {
  return useContext(PlaylistContext);
}

export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(playlistReducer, {
    listOfPlaylists,
  });

  const {  setRoute } = useVideoList();
  const [playlistToRender, setPlaylistToRender] = useState({});
  const { dispatch: historyListDispatch } = useHistoryList();

  function Playlists() {
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState(
      false
    );
    const [newPlaylistName, setNewPlaylistName] = useState("");
    return (
      <>
        <button
          className="button secondary-button"
          onClick={() => setShowCreatePlaylistModal(true)}
        >
          Create New Playlist
        </button>
        <div className="component-container card-div">
          {showCreatePlaylistModal && (
            <div className="modal" style={{ display: "block" }}>
              <div className="modal-content">
                <span
                  className="close"
                  onClick={() => setShowCreatePlaylistModal(false)}
                >
                  &times;
                </span>
                <p>Create New Playlist</p>
                <input
                  type="text"
                  onChange={(val) => setNewPlaylistName(val.target.value)}
                />
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD_NEW_PLAYLIST",
                      payload: newPlaylistName,
                    })
                  }
                >
                  create
                </button>
              </div>
            </div>
          )}

          {state.listOfPlaylists.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                border: "1px ",
                margin: "1rem",
                padding: "1rem",
                boxShadow: "5px 10px 5px #F3F4F6",
              }}
            >
              {item.title} <br />
              Number of videos: {item.videos.length} <br />
              <button
                onClick={() => {
                  setPlaylistToRender(item);
                  setRoute("Playlist");
                }}
              >
                Open playlist
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }

  function Playlist() {
    const { setItemToRender, setRoute } = useVideoList();
    return (
      <div className="component-container card-div">
        {playlistToRender.videos.map((item) => (
          <div
            key={item.id}
            className="card"
            style={{
              border: "1px ",
              margin: "1rem",
              padding: "1rem",
              boxShadow: "5px 10px 5px #F3F4F6"
            }}
          >
            <img
              src={item.imageUrl}
              style={{
                width: "100%",
              }}
              alt=""
            />
            <button
              onClick={() => {
                historyListDispatch({ type: "ADD_TO_HISTORY", payload: item });
                setItemToRender(item);
                setRoute("video");   
              }}
            >
              {" "}
              Open{" "}
            </button>{" "}
            <button onClick={() => console.log("clicked add")}>
              {" "}
              Unlike{" "}
            </button>{" "}
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
        Playlists,
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
        id: uuid(),
        title: action.payload,
        videos: [],
      };
      return {
        ...state,
        listOfPlaylists: [...state.listOfPlaylists, currentPlaylist],
      };

    case "ADD_TO_PLAYLIST":
      const listOfPlaylists = [...state.listOfPlaylists]
      const playlist = listOfPlaylists.find(
        (item) => item.id === action.payload.playlistId
      );
      console.log("List of playlists", listOfPlaylists);
      console.log("current playlist", playlist);
      if (
        playlist.videos.filter((item) => item.id === action.payload.videoObj.id)
          .length > 0
      ) {
        return {
          ...state,
        };
      }
      playlist.videos.push(action.payload.videoObj)
      return {

        ...state,
        listOfPlaylists
      };
    default:
      return {
        ...state,
      };
  }
}
