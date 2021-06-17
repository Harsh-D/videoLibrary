import { createContext, useContext, useReducer } from "react";
const LikedListContext = createContext();

export function useLikedList() {
  return useContext(LikedListContext);
}

export function LikedListProvider({ children }) {
  const [state, dispatch] = useReducer(likedListReducer, { likedVideos });

  function LikedListing() {
    return (
      <div className="component-container card-div">
        {state.likedVideos.map((item) => (
          <div
            key={item._id}
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
            onClick={() => {}}>Open</button>
            <button className="button secondary-button" onClick={() => console.log("clicked add")}>Unlike</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <LikedListContext.Provider
      value={{ likedVideos: state.likedVideos, dispatch, LikedListing }}
    >
      {children}
    </LikedListContext.Provider>
  );
}

const likedVideos = [];

function likedListReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_LIKED_VIDEOS":
      if (
        state.likedVideos.filter((item) => item._id === action.payload._id)
          .length > 0
      ) {
        return {
          ...state,
          likedVideos: state.likedVideos.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      console.log("adding to liked", likedVideos);
      return {
        ...state,
        likedVideos: state.likedVideos.concat(action.payload)
      };
    default:
      return { state };
  }
}
