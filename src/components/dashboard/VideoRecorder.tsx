import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, ReactMediaRecorderRenderProps } from 'react-media-recorder';
import { HiOutlinePlay, HiOutlineStop } from 'react-icons/hi';
import { HiOutlineVideoCameraSlash, HiOutlineVideoCamera } from "react-icons/hi2";

interface RecorderProps {
  setBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
  setBlobUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setIsVideo: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function VideoRecorder({setBlob, setBlobUrl, setIsVideo}: RecorderProps) {
  const [permissionsDenied, setPermissionsDenied] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingCompleted, setRecordingCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleRequestPermissions = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        setPermissionsDenied(false);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch(() => setPermissionsDenied(true));
  };

  useEffect(() => {
    // Function to stop the media stream
    const stopMediaStream = () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    if (cameraEnabled) {
      handleRequestPermissions();
    } else {
      stopMediaStream();
    }

    // Cleanup function to stop the media stream when the component unmounts
    return () => {
      stopMediaStream();
    };
  }, [cameraEnabled]);

  const handleToggleRecording = (startRecording: () => void, stopRecording: () => void) => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };

  return (
    <ReactMediaRecorder
      video={cameraEnabled}
      audio
      onStop={(blobUrl: string, blob: Blob)=>{setBlob(blob); setBlobUrl(blobUrl); setIsVideo(cameraEnabled);}}
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        previewStream,
        error,
      }: ReactMediaRecorderRenderProps) => {
        if (status === 'permission_denied' || permissionsDenied) {
          return (
            <div className="flex flex-col justify-center items-center h-full text-center">
              <p>Please allow access to your camera and microphone to continue.</p>
              <button
                onClick={handleRequestPermissions}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
              >
                Enable Camera
              </button>
            </div>
          );
        }

        return (
          <div className="flex flex-col items-center rounded-lg">
            <div className="relative mt-24 md:mt-20 rounded-lg flex justify-center items-center px-5 md:px-0">
              {(cameraEnabled || recordingCompleted) && (
                previewStream ? (
                  <video
                    className="md:w-full w-[calc(100vh-7rem)] md:h-[calc(100vh-13rem)] rounded-xl"
                    ref={(video) => {
                      if (video && previewStream) {
                        video.srcObject = previewStream;
                        video.play();
                      }
                    }}
                    autoPlay
                    playsInline
                    muted
                  />
                ) : (
                  <video
                    className="md:w-full w-[calc(100vh-7rem)] md:h-[calc(100vh-13rem)] rounded-xl"
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                  />
                )
              )}
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleToggleRecording(startRecording, stopRecording)}
                className={`px-4 py-2 ${isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-[#9aee59] hover:bg-[#6cde12]'} rounded-full  flex items-center`}
              >
                {isRecording ? <HiOutlineStop className="mr-2" /> : <HiOutlinePlay className="mr-2" />}
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
              {!isRecording && (
                <button
                  onClick={() => {
                    setCameraEnabled(!cameraEnabled);
                    setRecordingCompleted(false); // Reset recording completed flag when toggling camera
                  }}
                  className="px-4 py-2 border text-black rounded-full"
                >
                  {cameraEnabled ? <HiOutlineVideoCameraSlash size={24} /> : <HiOutlineVideoCamera size={24} />}
                </button>
              )}
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        );
      }}
    />
  );
}
