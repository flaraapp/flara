import React, { useState, useRef, useEffect } from 'react';
import { ReactMediaRecorder, ReactMediaRecorderRenderProps } from 'react-media-recorder';

export default function VideoRecorder() {
  const [permissionsDenied, setPermissionsDenied] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(true);
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
          <div className="flex flex-col items-center rounded-lg">
            <div className="relative mt-24 md:mt-20 rounded-lg flex justify-center items-center px-5 md:px-0">
              {cameraEnabled && (
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
              <button
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                {cameraEnabled ? 'Disable Camera' : 'Enable Camera'}
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
