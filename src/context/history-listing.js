import { createContext, useContext, useReducer } from "react";

const HistoryListContext = createContext();

export function useHistoryList() {
  return useContext(HistoryListContext);
}

export function HistoryListProvider({ children }) {
  const [state, dispatch] = useReducer(historyListReducer, { watchedVideos });

  function HistoryListing() {
    console.log(state.watchedVideos);
    return (
      <div className="component-container card-div">
        {state.watchedVideos.map((item) => (
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
            <img src={item.imageUrl} style={{ width: "100%" }} alt="" />
            <button onClick={() => {}}>Open</button>
            <button onClick={() => console.log("clicked add")}>Unlike</button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <HistoryListContext.Provider
      value={{ watchedVideos: state.watchedVideos, dispatch, HistoryListing }}
    >
      {children}
    </HistoryListContext.Provider>
  );
}

const watchedVideos = [];

function historyListReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      if (
        state.watchedVideos.filter((item) => item.id === action.payload.id)
          .length > 0
      ) {
        return {
          ...state
        };
      }
      return {
        ...state,
        watchedVideos: state.watchedVideos.concat(action.payload)
      };
    default:
      return { ...state };
  }
}
