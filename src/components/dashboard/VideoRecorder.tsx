import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, ReactMediaRecorderRenderProps } from 'react-media-recorder';

export default function VideoRecorder() {
  const [permissionsDenied, setPermissionsDenied] = useState(false);
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
    handleRequestPermissions();
  }, []);

  return (
    <ReactMediaRecorder
      video
      audio
      render={({
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
        previewStream,
        error,
      }: ReactMediaRecorderRenderProps) => {
        if (status === 'acquiring_media' || status === 'delayed_start') {
          return <div className="flex justify-center items-center h-full">Acquiring media...</div>;
        }

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
          <div className="flex flex-col items-center">
            <div className="relative w-full h-64 bg-gray-200 rounded-lg flex justify-center items-center">
              {previewStream ? (
                <video
                  className="w-full h-full"
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
                  className="w-full h-full"
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                />
              )}
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={startRecording}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Start Recording
              </button>
              <button
                onClick={stopRecording}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Stop Recording
              </button>
            </div>
            {mediaBlobUrl && (
              <div className="mt-4">
                <video src={mediaBlobUrl} controls className="w-full h-64"></video>
              </div>
            )}
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        );
      }}
    />
  );
}
