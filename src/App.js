import logo from "./logo.svg";
import "./App.css";

import "./styles.css";
import { useVideoList } from "./context/video-listing";
import { useVideoPage } from "./context/video-page";
import { useLikedList } from "./context/liked-listing";
import { useHistoryList } from "./context/history-listing";
import { usePlaylist } from "./context/playlist-listing";

function App() {
  const { VideoListing, route, setRoute } = useVideoList();
  const { Video } = useVideoPage();
  const { LikedListing } = useLikedList();
  const { HistoryListing } = useHistoryList();
  const { Playlists } = usePlaylist();

  return (
    <div className="App">
      <nav className="nav-main nav-primary">
        <div className="nav--logo">
          <p>HD </p>
        </div>
        <ul className="list nav--list">
          <li className="nav-item" onClick={() => setRoute("videos")}>
            VIDEOS
          </li>
          <li className="nav-item" onClick={() => setRoute("Playlists")}>
            PLAYLISTS
          </li>
          <li className="nav-item" onClick={() => setRoute("Liked")}>
            LIKED
          </li>
          <li className="nav-item" onClick={() => setRoute("History")}>
            HISTORY
          </li>
        </ul>
      </nav>
      <div className="SideBar">
        <ul className="">
          <li className="" onClick={() => setRoute("videos")}>
            VIDEOS
          </li>
          <li className="" onClick={() => setRoute("Playlists")}>
            PLAYLISTS
          </li>
          <li onClick={() => setRoute("Liked")}>LIKED</li>
          <li onClick={() => setRoute("History")}>HISTORY</li>
        </ul>
      </div>
      <div className="main">
        {route === "videos" && <VideoListing />}
        {route === "video" && <Video />}
        {route === "Liked" && <LikedListing />}
        {route === "History" && <HistoryListing />}
        {route === "Playlists" && <Playlists />}
      </div>
    </div>
  );
}

export default App;
