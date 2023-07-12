import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const songList = [
    "/audio/song1.mp3",
    "/audio/song2.mp3",
    // Add more songs to the list as needed
  ];
  const audioRef = useRef(null);
  const [timerDuration, setTimerDuration] = useState(0);
  const [customTimer, setCustomTimer] = useState(0);

  useEffect(() => {
    const playBackgroundMusic = () => {
      const audio = new Audio(songList[currentSongIndex]);
      audio.loop = false;
      audio.play();

      audio.addEventListener("ended", handleSongEnd);

      audioRef.current = audio;
    };

    const handleSongEnd = () => {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songList.length);
      setTimerDuration(0);
    };

    if (isPlaying) {
      playBackgroundMusic();
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [isPlaying, currentSongIndex, songList]);

  useEffect(() => {
    if (isPlaying && timerDuration > 0) {
      const timer = setTimeout(() => {
        setIsPlaying(false);
      }, timerDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isPlaying, timerDuration]);

  const handleSetTimer = (duration) => {
    setTimerDuration(duration);
    setIsPlaying(true);
  };

  const handleCustomTimerChange = (event) => {
    setCustomTimer(event.target.value);
  };

  const handleCustomTimerSubmit = (event) => {
    event.preventDefault();
    const duration = parseInt(customTimer, 10);
    if (!isNaN(duration) && duration > 0) {
      handleSetTimer(duration);
    }
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songList.length);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songList.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <Head>
        <title>My Music App</title>
      </Head>
      <h1>Welcome to My Music App</h1>
      {!isPlaying && (
        <div>
          <button onClick={() => handleSetTimer(5)}>Play for 5 seconds</button>
          <button onClick={() => handleSetTimer(60)}>Play for 1 minute</button>
          <button onClick={() => handleSetTimer(120)}>
            Play for 2 minutes
          </button>
        </div>
      )}
      <button onClick={handlePreviousSong}>Previous</button>
      <button onClick={handleNextSong}>Next</button>
      <div>
        {isPlaying && (
          <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={timerDuration}
            colors={[["#D14081"]]}
            onComplete={() => setIsPlaying(false)}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        )}
      </div>
    </div>
  );
};

export default Home;
