import { createContext, useContext, useReducer, useState } from "react";
import { useHistoryList } from "./history-listing";

const VideoListContext = createContext();

export function useVideoList() {
  return useContext(VideoListContext);
}

export function VideoListProvider({ children }) {
  const [state, dispatch] = useReducer(videoListReducer, { videosInList });
  const [route, setRoute] = useState("videos");
  const [itemToRender, setItemToRender] = useState();

  function videoListReducer(state, action) {}

  function VideoListing() {
    const { dispatch: historyListDispatch } = useHistoryList();
    return (
      <div className="component-container card-div">
        {videosInList.map((item) => (
          <div
            key={item.id}
            onClick={() => console.log("clicked")}
            className="card"
            style={{
              border: "1px solid",
              margin: "1rem",
              padding: "1rem"
            }}
          >
            <img src={item.imageUrl} style={{ width: "100%" }} alt="" />
            <button
              onClick={() => {
                historyListDispatch({ type: "ADD_TO_HISTORY", payload: item });
                setRoute("video");
                setItemToRender(item);
              }}
            >
              Open
            </button>
            <button onClick={() => console.log("clicked add")}>
              Add to Playlist
            </button>
          </div>
        ))}
      </div>
    );
  }
  return (
    <VideoListContext.Provider
      value={{ videosInList, VideoListing, route, setRoute, itemToRender }}
    >
      {children}
    </VideoListContext.Provider>
  );
}

const videosInList = [
  {
    id: 1,
    url: "https://www.youtube.com/embed/tgbNymZ7vqY",
    imageUrl: "https://i.ytimg.com/vi/tgbNymZ7vqY/maxresdefault.jpg"
  },
  {
    id: 2,
    url: "https://www.youtube.com/embed/kPyP1hx-QCU",
    imageUrl: "https://i.ytimg.com/vi/kPyP1hx-QCU/mqdefault.jpg"
  },
  {
    id: 3,
    url: "https://www.youtube.com/embed/xnSew-tCuPo",
    imageUrl: "https://i.ytimg.com/vi/xnSew-tCuPo/mqdefault.jpg"
  },
  {
    id: 4,
    url: "https://www.youtube.com/embed/LSkaoMIxjv0",
    imageUrl: "https://i.ytimg.com/vi/LSkaoMIxjv0/mqdefault.jpg"
  },
  {
    id: 5,
    url: "https://www.youtube.com/embed/A-IzCeM6C-k",
    imageUrl: "https://i.ytimg.com/vi/A-IzCeM6C-k/mqdefault.jpg"
  }
];
