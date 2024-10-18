"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Check, Mic, Trash } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  timerClassName?: string;
  onRecordingComplete: (blob: Blob) => void;
};

type Record = {
  id: number;
  name: string;
  file: any;
};

let recorder: MediaRecorder;
let recordingChunks: BlobPart[] = [];
let timerTimeout: NodeJS.Timeout;

const padWithLeadingZeros = (num: number, length: number): string => {
  return String(num).padStart(length, "0");
};

export const AudioRecorder = ({
  className,
  timerClassName,
  onRecordingComplete,
}: Props) => {
  const { theme } = useTheme();
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isRecordingFinished, setIsRecordingFinished] =
    useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [currentRecord, setCurrentRecord] = useState<Record>({
    id: -1,
    name: "",
    file: null,
  });

  const hours = Math.floor(timer / 3600);
  const minutes = Math.floor((timer % 3600) / 60);
  const seconds = timer % 60;

  const [hourLeft, hourRight] = useMemo(
    () => padWithLeadingZeros(hours, 2).split(""),
    [hours]
  );
  const [minuteLeft, minuteRight] = useMemo(
    () => padWithLeadingZeros(minutes, 2).split(""),
    [minutes]
  );
  const [secondLeft, secondRight] = useMemo(
    () => padWithLeadingZeros(seconds, 2).split(""),
    [seconds]
  );

  function startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          setIsRecording(true);
          recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' }); // Use 'audio/webm' for better compatibility
          recordingChunks = [];
          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) recordingChunks.push(e.data); // Ensure only non-empty data is pushed
          };
          recorder.start();
        })
        .catch((error) => {
          alert("Error accessing microphone: " + error);
          console.log(error);
        });
    }
  }

  function stopRecording() {
    recorder.onstop = () => {
      const recordBlob = new Blob(recordingChunks, { type: "audio/webm" });
      if (recordingChunks.length > 0) {
        onRecordingComplete(recordBlob); // Pass the complete blob to the parent component
      }
      setCurrentRecord({
        ...currentRecord,
        file: window.URL.createObjectURL(recordBlob),
      });
      recordingChunks = [];
    };
    recorder.stop();
    setIsRecording(false);
    setIsRecordingFinished(true);
    setTimer(0);
    clearTimeout(timerTimeout);
  }

  function resetRecording() {
    setIsRecording(false);
    setIsRecordingFinished(true);
    setTimer(0);
    clearTimeout(timerTimeout);
  }

  useEffect(() => {
    if (isRecording) {
      timerTimeout = setTimeout(() => {
        setTimer(timer + 1);
      }, 1000);
    }
    return () => clearTimeout(timerTimeout);
  }, [isRecording, timer]);

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {isRecording ? (
        <Timer
          hourLeft={hourLeft}
          hourRight={hourRight}
          minuteLeft={minuteLeft}
          minuteRight={minuteRight}
          secondLeft={secondLeft}
          secondRight={secondRight}
          timerClassName={timerClassName}
        />
      ) : null}
      <div className="flex gap-2">
        {isRecording ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={resetRecording}
                size={"icon"}
                variant={"destructive"}
                className="rounded-full"
              >
                <Trash size={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent className="m-2">
              <span> Reset recording</span>
            </TooltipContent>
          </Tooltip>
        ) : null}

        <Tooltip>
          <TooltipTrigger asChild>
            {!isRecording ? (
              <Button className="bg-[#9aee59] hover:bg-[#6cde12] rounded-full text-[#333333] h-14 w-14" onClick={() => startRecording()} size={"icon"}>
                <Mic size={20} />
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                size={"icon"}
                className="bg-[#9aee59] hover:bg-[#6cde12] text-[#333333] rounded-full"
              >
                <Check size={15} />
              </Button>
            )}
          </TooltipTrigger>
          <TooltipContent className="m-2">
            <span>
              {!isRecording ? "Start recording" : "Stop and save recording"}
            </span>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

const Timer = React.memo(
  ({
    hourLeft,
    hourRight,
    minuteLeft,
    minuteRight,
    secondLeft,
    secondRight,
    timerClassName,
  }: {
    hourLeft: string;
    hourRight: string;
    minuteLeft: string;
    minuteRight: string;
    secondLeft: string;
    secondRight: string;
    timerClassName?: string;
  }) => {
    return (
      <div
        className={cn(
          "flex items-center justify-center gap-1 text-lg font-semibold text-foreground py-2",
          timerClassName
        )}
      >
        <span className="w-10 h-10 text-center p-1 rounded-full bg-gray-100">{minuteLeft}</span>
        <span className="w-10 h-10 text-center p-1 rounded-full bg-gray-100">{minuteRight}</span>
        <span>:</span>
        <span className="w-10 h-10 text-center p-1 rounded-full bg-gray-100">{secondLeft}</span>
        <span className="w-10 h-10 text-center p-1 rounded-full bg-gray-100">{secondRight}</span>
      </div>
    );
  }
);
Timer.displayName = "Timer";
