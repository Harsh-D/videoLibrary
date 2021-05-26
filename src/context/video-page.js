import { createContext, useContext} from "react";
import { useVideoList } from "./video-listing";
import { useLikedList } from "./liked-listing";
import {NavLink} from "react-router-dom";

const VideoPageContext = createContext();

export function useVideoPage() {
  return useContext(VideoPageContext);
}

export function VideoPageProvider({ children }) {
  function Video(id) {
    const { itemToRender } = useVideoList();
    const { dispatch: likedVideosDispatch } = useLikedList();
    return (
      <div className="component-container card-div">
        
        <div
          key={itemToRender._id}
          onClick={() => console.log("clicked")}
          className="card"
          style={{
            border: "1px ",
            margin: "1rem",
            padding: "1rem",
            boxShadow: "5px 10px 5px #F3F4F6"
          }}
        >
          <iframe
            disabled
            title={itemToRender._id}
            width="100%"
            height="400vh"
            src={itemToRender.url}
          ></iframe>
          <button
            className="button primary-button"
            onClick={() =>
              likedVideosDispatch({
                type: "ADD_TO_LIKED_VIDEOS",
                payload: itemToRender
              })
            }
          >
            Like
          </button>
          <button className="button secondary-button">
            
            <NavLink to="/videos" className="NavElement">
            Back
                </NavLink>
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
