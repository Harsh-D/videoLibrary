import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { StrictMode } from "react";
import { VideoListProvider } from "./context/video-listing";
import { VideoPageProvider } from "./context/video-page";
import { LikedListProvider } from "./context/liked-listing";
import { HistoryListProvider } from "./context/history-listing";
import { PlaylistProvider } from "./context/playlist-listing";
import { BrowserRouter as Router } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Router>
      <VideoListProvider>
        <HistoryListProvider>
          <LikedListProvider>
            <PlaylistProvider>
              <VideoPageProvider>
                <App />
              </VideoPageProvider>
            </PlaylistProvider>
          </LikedListProvider>
        </HistoryListProvider>
      </VideoListProvider>
    </Router>
  </StrictMode>,
  rootElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
