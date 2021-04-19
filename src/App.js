import logo from './logo.svg';
import './App.css';

import "./styles.css";
import { useVideoList } from "./context/video-listing";
import { useVideoPage } from "./context/video-page";
import { useLikedList } from "./context/liked-listing";
import { useHistoryList } from "./context/history-listing";


function App() {
  const { VideoListing, route, setRoute } = useVideoList();
  const { Video } = useVideoPage();
  const { LikedListing } = useLikedList();
  const { HistoryListing } = useHistoryList();
  
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
          <li className="nav-item" onClick={() => setRoute("videos")}>
            PLAYLIST
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
          <li className="" onClick={() => setRoute("videos")}>
            PLAYLIST
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
      </div>
    </div>
  );
}

export default App;
