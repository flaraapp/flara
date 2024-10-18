import { HiCheckCircle } from "react-icons/hi";
import { AudioRecorder } from "@/components/ui/audio";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomAudioPlayer from "@/components/ui/player";
import { useState } from "react";

interface Props {
  question: string;
  id: number;
  activeId: number;
  recordedBlob: Blob | null; // Now passed from QuestionContainer
  isCompleted: boolean; // Now passed from QuestionContainer
  completeQuestion: (rec: Blob, id: number) => void;
}

export default function Question(props: Props) {
  const [error, setError] = useState<string | null>(null);
  const [recorded, setRecorded] = useState<Blob>();
  // Callback function for handling the end of a recording
  const handleRecordingComplete = (blob: Blob) => {
    props.completeQuestion(blob, props.id);
    setRecorded(blob);// Complete the question using the callback prop
    console.log('Complete', blob);
  };

  return (
    <TooltipProvider>
      <div className="transition duration-500 px-10">
        <div className="flex transition duration-500">
          {props.isCompleted && (
            <div className="w-min mt-1.5">
              <div className="w-1.5 rounded-full h-full mr-2 bg-[#B2F260]"></div>
            </div>
          )}
          {!props.isCompleted && (
            <div className="w-min mt-1.5">
              <div className="w-1.5 rounded-full h-full mr-2 bg-neutral-100"></div>
            </div>
          )}
          <div className="text-3xl font-light">{props.question}</div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          {/* Audio Recorder */}
          <AudioRecorder
            className="w-full mt-4"
            timerClassName="text-lg"
            onRecordingComplete={handleRecordingComplete}
          />
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </TooltipProvider>
  );
}
