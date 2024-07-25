
import SubmitSpeech from '@/components/dashboard/speech/SubmitSpeech';
import VideoRecorder from '@/components/dashboard/VideoRecorder';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Dispatch, SetStateAction, useState } from 'react';
import ErrorScreen from '../state/Error';
interface SpeechProps {
    user: UserProfile;
}
export default function SpeechContent({user}: SpeechProps) {
  const [blob, setBlob] = useState() as [Blob, Dispatch<SetStateAction<Blob | null>>];
  const [blobUrl, setBlobUrl] = useState() as [string, Dispatch<SetStateAction<string | null>>];
  const [isVideo, setIsVideo] = useState(true);
  const [error, setError] = useState(false);
  if (error) {
    <ErrorScreen error={{name: "500", message: "Unable to process recording."}}/>
  }
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      { blob ?
      <SubmitSpeech blob={blob} blobUrl={blobUrl} isVideo={isVideo} setBlob={setBlob} setBlobUrl={setBlobUrl} setError={setError}/>
      :
      <VideoRecorder setBlob={setBlob} setBlobUrl={setBlobUrl} setIsVideo={setIsVideo}/>
      }
    </div>
  );
}