import { HiOutlineMicrophone } from "react-icons/hi";
import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi"; // Import the checkmark icon

interface Props {
  question: string;
  id: number;
  activeId: number;
  completeQuestion: (rec: Blob, id: number) => void;
}

export default function Question(props: Props) {
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    startRecording,
    stopRecording,
    mediaBlobUrl,
    status,
  } = useReactMediaRecorder({ audio: true });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "recording") {
      timer = setTimeout(() => {
        stopRecording();
      }, 300000); // 5 minutes limit
    }
    return () => clearTimeout(timer);
  }, [status, stopRecording]);

  useEffect(() => {
    if (status === "stopped" && mediaBlobUrl) {
      fetch(mediaBlobUrl)
        .then((res) => res.blob())
        .then((blob) => {
          props.completeQuestion(blob, props.id);
          setRecordedBlobUrl(mediaBlobUrl);
        });
    } else if (status === "permission_denied") {
      setError("Failed to access microphone. Please check your permissions.");
    }
  }, [status, mediaBlobUrl, props]);

  return (
    <div className={'mt-20 transition duration-500 ' + (props.id > props.activeId ? 'opacity-0' : '')}>
      <div className="flex transition duration-500">
        {props.id < props.activeId && (
          <div className="w-min mt-1.5">
          <HiCheckCircle className="text-[#B2F260] mr-2" size={30} />
          </div>
        )}
        <div className="text-3xl font-light">{props.question}</div>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <button
          onClick={status === "recording" ? stopRecording : startRecording}
          className="text-red-500 border border-red-500 rounded-full w-min p-2 flex gap-2 items-center justify-center hover:text-white hover:bg-red-500 transition duration-500 h-10 mt-2"
          disabled={props.id > props.activeId} // Disable button if id is greater than activeId
        >
          <HiOutlineMicrophone size={15} className="" />
          {status === "recording" ? "Stop" : recordedBlobUrl ? "Rerecord" : "Record"}
        </button>
        {recordedBlobUrl && (
          <audio key={recordedBlobUrl} controls src={recordedBlobUrl} className="ml-4">
            Your browser does not support the audio element.
          </audio>
        )}
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
}