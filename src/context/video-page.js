import { createContext, useContext, useReducer, useState } from "react";
import { useVideoList } from "./video-listing";
import { useLikedList } from "./liked-listing";

const VideoPageContext = createContext();

export function useVideoPage() {
  return useContext(VideoPageContext);
}

export function VideoPageProvider({ children }) {
  function Video(id) {
    const { itemToRender, setRoute } = useVideoList();
    const { likedVideos, dispatch: likedVideosDispatch } = useLikedList();
    return (
      <div className="component-container card-div">
        Video
        <div
          key={itemToRender.id}
          onClick={() => console.log("clicked")}
          className="card"
          style={{
            border: "1px solid",
            margin: "1rem",
            padding: "1rem"
          }}
        >
          <iframe
            disabled
            title={itemToRender.id}
            width="100%"
            height="400vh"
            src={itemToRender.url}
          ></iframe>
          <button onClick={() => setRoute("videos")}>Back</button>
          <button
            onClick={() =>
              likedVideosDispatch({
                type: "ADD_TO_LIKED_VIDEOS",
                payload: itemToRender
              })
            }
          >
            Like
          </button>
        </div>
      </div>
    );
  }

  return (
    <VideoPageContext.Provider value={{ Video }}>
      {children}
    </VideoPageContext.Provider>
  );
}
