import React from "react";
import "./Latest-videos.css";
const Latestvideos = () => {
  return (
    <div className="latest-videos">
      <div className="container">
        <h2>Latest Videos</h2>
        <div className="videos">
  <iframe
    src="https://www.youtube.com/embed/3cmB9dDFtNU"
    frameborder="0"
    allowfullscreen
    height={300}
    width={300}
  ></iframe>
  <iframe
    src="https://www.youtube.com/embed/FSJmJ9nx7FE"
    frameborder="0"
    allowfullscreen
  ></iframe>
  <iframe
    src="https://www.youtube.com/embed/5CC7oggo_NM"
    frameborder="0"
    allowfullscreen
  ></iframe>
  <iframe
    src="https://www.youtube.com/embed/gUuGEw1_09E"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>

      </div>
    </div>
  );
};

export default Latestvideos;
