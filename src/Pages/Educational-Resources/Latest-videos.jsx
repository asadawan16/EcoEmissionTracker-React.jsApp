import React from "react";
import "./Latest-videos.css";

const Latestvideos = () => {
  return (
    <div className="latest-videos">
      <div className="container">
        <h2>Latest Videos</h2>
        <div className="videos">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/xkG8i_4mdCM"
              frameBorder="0"
              allowFullScreen
              title="Video 1"
            ></iframe>
          </div>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/eJHEMFd61bs"
              frameBorder="0"
              allowFullScreen
              title="Video 2"
            ></iframe>
          </div>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/q8VMsHKcywg"
              frameBorder="0"
              allowFullScreen
              title="Video 3"
            ></iframe>
          </div>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/myZAvqqp9Jc"
              frameBorder="0"
              allowFullScreen
              title="Video 4"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latestvideos;
