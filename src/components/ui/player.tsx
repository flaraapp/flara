import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; // Core styles from the library
import { Button } from './button';

type CustomAudioPlayerProps = {
  src: string;
};

const isMobile = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src }) => {
  const playerRef = useRef<AudioPlayer>(null);
  const audioElementRef = useRef<HTMLAudioElement>(null); // For mobile playback
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [webmBlobURL, setWebmBlobURL] = useState<string | null>(null);

  // Function to convert audio to webm using MediaRecorder
  const convertToWebm = async (audioSrc: string) => {
    try {
      const audioContext = new AudioContext();
      const audioBuffer = await fetch(audioSrc)
        .then((response) => response.arrayBuffer())
        .then((buffer) => audioContext.decodeAudioData(buffer));

      const streamDestination = audioContext.createMediaStreamDestination();
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(streamDestination);
      source.start();

      // Set up MediaRecorder for WebM conversion
      const mediaRecorder = new MediaRecorder(streamDestination.stream, {
        mimeType: 'audio/webm',
      });
      let chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const webmBlob = new Blob(chunks, { type: 'audio/webm' });
        const webmBlobURL = URL.createObjectURL(webmBlob);
        setWebmBlobURL(webmBlobURL); // Set the converted WebM Blob URL for playback
      };

      // Start recording and convert to WebM
      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop(); // Stop recording after audio playback is finished
      }, audioBuffer.duration * 1000);
    } catch (error) {
      console.error('Error converting audio to WebM:', error);
    }
  };

  useEffect(() => {
    if (isMobile()) {
      // On mobile, we do not convert the audio, just use the src directly
      setWebmBlobURL(null);
    } else {
      // Convert to WebM on non-mobile devices
      convertToWebm(src);
    }
  }, [src]);

  const handlePlayPause = () => {
    const audioElement = isMobile() ? audioElementRef.current : playerRef.current?.audio.current;

    if (audioElement) {
      if (audioElement.paused) {
        audioElement.play();
        setIsPlaying(true);
      } else {
        audioElement.pause();
        setIsPlaying(false);
      }
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
      className="rounded-2xl flex flex-col items-center"
      onClickCapture={() => setUserInteracted(true)}
    >
      {isMobile() ? (
        <audio ref={audioElementRef} src={src} controls={false} preload="metadata" />
      ) : (
        webmBlobURL && (
          <AudioPlayer
            ref={playerRef}
            src={webmBlobURL} // Play the converted WebM blob
            autoPlay={false} // Explicitly prevent autoPlay
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
        )
      )}

      <Button
        onClick={handlePlayPause}
        className={
          "border bg-white hover:bg-neutral-200 px-4 text-[#333333] rounded-xl w-min p-2 flex gap-2 items-center justify-center hover:scale-105 transition duration-500 h-10 "
        }
      >
        <div className="px-4">{isPlaying ? "Pause Response" : "Play Response"}</div>
      </Button>
    </div>
  );
};

export default CustomAudioPlayer;
