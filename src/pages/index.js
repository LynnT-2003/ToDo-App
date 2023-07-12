import React, { useState, useEffect, useRef } from "react";
import MP3Player from "../components/MP3Player";

const Timer = ({ initialTime, onTimerEnd, onPlay, onPause }) => {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            onTimerEnd();
          }
          return prevTime - 1;
        });
      }, 1000);
      onPlay(); // Start playing the audio
    } else {
      clearInterval(intervalRef.current);
      onPause(); // Pause the audio
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning, onTimerEnd, onPlay, onPause]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(initialTime);
    setIsRunning(false);
  };

  return (
    <div>
      <div>Time Remaining: {time} seconds</div>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

const songs = [
  "https://youtu.be/RVTDyaRRM9E",
  "https://youtu.be/TxUdlC0057s",
  "https://youtu.be/9CVVTRxMKVM",
  // Add more songs as needed
];

const MainPage = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < songs.length ? nextIndex : 0;
    });
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) => {
      const previousIndex = prevIndex - 1;
      return previousIndex >= 0 ? previousIndex : songs.length - 1;
    });
  };

  const handleTimerEnd = () => {
    setIsPlaying(false);
    alert("Timer ended!");
    // You can set a new timer here
  };

  const handleSongPlay = () => {
    setIsPlaying(true);
    console.log("Song is playing");
  };

  const handleSongPause = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <h1>My Music App</h1>
      <Timer
        initialTime={60}
        onTimerEnd={handleTimerEnd}
        onPlay={handleSongPlay}
        onPause={handleSongPause}
      />
      <MP3Player
        src={songs[currentSongIndex]}
        isPlaying={isPlaying}
        onPlay={handleSongPlay}
        onPause={handleSongPause}
        onEnded={playNextSong}
      />
      <button onClick={playPreviousSong}>Previous</button>
      <button onClick={playNextSong}>Next</button>
    </div>
  );
};

export default MainPage;
