import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MP3Player = ({ src }) => {
  return (
    <div>
      <AudioPlayer
        autoPlay
        src={src}
        onPlay={(e) => console.log("onPlay")}
        onPause={(e) => console.log("onPause")}
        onEnded={(e) => console.log("onEnded")}
      />
    </div>
  );
};

export default MP3Player;
