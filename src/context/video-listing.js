import { createContext, useContext, useState } from "react";
import { useHistoryList } from "./history-listing";
import { usePlaylist } from "./playlist-listing";

const VideoListContext = createContext();

export function useVideoList() {
  return useContext(VideoListContext);
}

export function VideoListProvider({ children }) {
  //const [state, dispatch] = useReducer(videoListReducer, { videosInList });
  const [route, setRoute] = useState("videos");
  const [itemToRender, setItemToRender] = useState();

  //function videoListReducer(state, action) {}

  function VideoListing() {
    const { dispatch: historyListDispatch } = useHistoryList();
    const [showAddToPlaylistModal, setShowAddToPlaylistModal] = useState(false);
    const { listOfPlaylists, dispatch: playlistDispatch } = usePlaylist();

    const [addVideoToPlaylist, setAddVideoToPlaylist] = useState();

    function isVideoAddedToPlaylist(playlistId, videoId) {
      const playlist = listOfPlaylists.find((item) => item.id === playlistId);
      console.log("list of playlist", listOfPlaylists);
      console.log("check playlist ", playlist);
      if (playlist.videos.find((item) => item.id === videoId)) return true;
      return false;
    }

    function addedToPlaylistHandler(playlistId, videoObj, isChecked) {
      const playlist = listOfPlaylists.find((item) => item.id === playlistId);
      if (isChecked) {
        if (!playlist.videos.find((item) => item.id === videoObj.id)) {
          return playlistDispatch({
            type: "ADD_TO_PLAYLIST",
            payload: { videoObj, playlistId },
          });
        }
      }
    }

    return (
      <div className="component-container card-div">
        {videosInList.map((item) => (
          <div
            key={item.id}
            onClick={() => console.log("clicked")}
            className="card"
            style={{
              border: "1px ",
              margin: "1rem",
              padding: "1rem",
              boxShadow: "5px 10px 5px #F3F4F6"
            }}
          >
            <img src={item.imageUrl} style={{ width: "100%" }} alt="" />
            <button
              className="button primary-button"
              onClick={() => {
                historyListDispatch({ type: "ADD_TO_HISTORY", payload: item });
                setRoute("video");
                setItemToRender(item);
              }}
            >
              Open
            </button>
            <button
            className="button secondary-button"
              onClick={() => {
                setShowAddToPlaylistModal(true);
                setAddVideoToPlaylist(item);
              }}
            >
              Add to Playlist
            </button>
          </div>
        ))}
        {showAddToPlaylistModal && (
          <div className="modal" style={{ display: "block" }}>
            <div className="modal-content">
              <span
                className="close"
                onClick={() => setShowAddToPlaylistModal(false)}
              >
                &times;
              </span>
              {listOfPlaylists.map((obj) => (
                <div>
                  <input
                    type="checkbox"
                    checked={isVideoAddedToPlaylist(obj.id, addVideoToPlaylist.id)}
                    onChange={(val) =>
                      addedToPlaylistHandler(obj.id, addVideoToPlaylist, val.target.checked)
                    }
                  />
                  {obj.title}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <VideoListContext.Provider
      value={{ videosInList, VideoListing, route, setRoute, itemToRender,setItemToRender }}
    >
      {children}
    </VideoListContext.Provider>
  );
}

const videosInList = [
  {
    id: 1,
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    imageUrl: "https://i.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg",
  },
  {
    id: 2,
    url: "https://www.youtube.com/embed/kPyP1hx-QCU",
    imageUrl: "https://i.ytimg.com/vi/kPyP1hx-QCU/mqdefault.jpg",
  },
  {
    id: 3,
    url: "https://www.youtube.com/embed/xnSew-tCuPo",
    imageUrl: "https://i.ytimg.com/vi/xnSew-tCuPo/mqdefault.jpg",
  },
  {
    id: 4,
    url: "https://www.youtube.com/embed/LSkaoMIxjv0",
    imageUrl: "https://i.ytimg.com/vi/LSkaoMIxjv0/mqdefault.jpg",
  },
  {
    id: 5,
    url: "https://www.youtube.com/embed/A-IzCeM6C-k",
    imageUrl: "https://i.ytimg.com/vi/A-IzCeM6C-k/mqdefault.jpg",
  },
];
