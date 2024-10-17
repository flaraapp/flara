import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; // Core styles from the library

type CustomAudioPlayerProps = {
  src: string;
};

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src }) => {
  const playerRef = useRef<AudioPlayer>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    const audioElement = playerRef.current?.audio.current;

    if (audioElement) {
      // Set duration when metadata is loaded
      audioElement.addEventListener('loadedmetadata', () => {
        if (audioElement.duration && isFinite(audioElement.duration)) {
          setDuration(audioElement.duration);
        } else {
          setDuration(0); // Handle cases where duration is invalid
        }
      });

      // Reset isPlaying state when audio finishes playing
      audioElement.addEventListener('ended', () => {
        setIsPlaying(false); // Reset the state to false when playback ends
      });
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (audioElement) {
        audioElement.removeEventListener('loadedmetadata', () => {});
        audioElement.removeEventListener('ended', () => {});
      }
    };
  }, []);

  const handlePlayPause = () => {
    const audioElement = playerRef.current?.audio.current;

    if (audioElement?.paused) {
      audioElement.play();
      setIsPlaying(true);
    } else {
      audioElement?.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (time: number | null) => {
    if (time === null || time === 0) return '00:00'; // Default time if there's an issue
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  return (
    <div
      className="rounded-2xl mt-10 flex flex-col items-center"
      onClickCapture={() => setUserInteracted(true)}
    >
      <AudioPlayer
        ref={playerRef}
        src={src}
        autoPlay={false}
        showJumpControls={false} // Hide jump controls
        customAdditionalControls={[]} // Hide extra controls
        customVolumeControls={[]} // Hide volume controls
        layout="horizontal-reverse"
        customIcons={{
          play: <span />, // Remove default play icon
          pause: <span />, // Remove default pause icon
        }}
        className="hidden bg-gray-50 text-gray-800 rounded-md w-[50%]" // Hide the audio player's UI
        progressUpdateInterval={500}
      />

      <button
        className="border bg-gray-100 hover:bg-gray-200 transition duration-500 rounded-2xl px-4 py-2"
        onClick={handlePlayPause}
      >
        {isPlaying ? 'Play recorded response' : 'Play recorded response'}
      </button>
    </div>
  );
};

export default CustomAudioPlayer;
