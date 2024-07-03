import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, ReactMediaRecorderRenderProps } from 'react-media-recorder';
import { HiOutlinePlay, HiOutlineStop } from 'react-icons/hi';
import { HiOutlineVideoCameraSlash, HiOutlineVideoCamera } from "react-icons/hi2";

export default function VideoRecorder() {
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
    if (cameraEnabled) {
      handleRequestPermissions();
    } else if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
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
                className={`px-4 py-2 ${isRecording ? 'bg-red-500 text-white' : 'bg-[#9aee59]'} rounded-full hover:bg-[#6cde12]  flex items-center`}
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
