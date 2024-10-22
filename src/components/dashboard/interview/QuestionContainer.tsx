import { useState } from "react";
import Question from "./Question";
import { useUser } from "@auth0/nextjs-auth0/client";
import { SubmitProps } from "@/screens/dashboard/Interview";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import CustomAudioPlayer from "@/components/ui/player";

interface Props {
  questions: string[];
  props: SubmitProps;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuestionContainer({ questions, props, setError }: Props) {
  const [activeId, setActiveId] = useState(0);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const [blobs, setBlobs] = useState<Blob[]>(new Array(questions.length).fill(null)); // Store blobs for each question
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>(new Array(questions.length).fill(false)); // Store completion status

  const { user } = useUser();

  const completeQuestion = (rec: Blob, id: number) => {
    // Update the blob for the current question
    setBlobs((prevBlobs) => {
      const updatedBlobs = [...prevBlobs];
      updatedBlobs[id] = rec;
      return updatedBlobs;
    });

    // Mark the question as completed
    setCompletedQuestions((prevCompleted) => {
      const updatedCompleted = [...prevCompleted];
      updatedCompleted[id] = true;
      return updatedCompleted;
    });

    // // Move to the next question if it's the active one
    // if (id === activeId && activeId < questions.length - 1) {
    //   setActiveId(id + 1);
    // }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    blobs.forEach((blob, index) => {
      formData.append("files", blob, `file${index}.wav`);
    });

    questions.forEach((question) => {
      formData.append("questions", question);
    });

    formData.append("user_sub", user?.sub || "");
    formData.append("title", props.title || "Untitled");
    formData.append("isVideo", "false");
    formData.append("isTechnical", (props.isTechnical || false) + "");
    formData.append("job_description", props.jobDescription);
    formData.append("resume", props.resume || "Nothing");

    try {
      setProcessing(true);
      const response = await fetch(
        "https://flara--flara-backend-fastapi-endpoint.modal.run/process_interview/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await response.json();
      if (data.error) {
        setProcessing(false);
        setError(true);
      } else {
        setProcessing(false);
        router.push("/dashboard/reports/interview/" + data);
      }
    } catch (error) {
      setProcessing(false);
      setError(true);
    }
  };

  const handleNext = () => {
    if (activeId < questions.length - 1) setActiveId(activeId + 1);
  };

  const handlePrevious = () => {
    if (activeId > 0) setActiveId(activeId - 1);
  };

  if (processing)
    return (
      <div className="overflow-y-hidden grow h-full">
        <div className="flex justify-center items-center h-screen  md:h-full">
          <div className="mx-10 border rounded-3xl overflow-hidden">
            <div className="flex justify-center items-center pb-4">
              <svg
                aria-hidden="true"
                className="w-16 h-16 mt-10 text-gray-200 animate-spin fill-[#6cde12] flex justify-center items-center"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
            <p className="text-2xl text-gray-500 animate-pulse text-center px-5 md:px-10">
              Processing Interview...
            </p>
            <div className="text-center flex justify-center px-5 md:px-10">
              <p className="text-center max-w-80 text-[#22222290] mt-3">
                This may take up to 2 minutes.
              </p>
            </div>
            <div className="text-center flex justify-center">
              <p className="text-center max-w-[30rem] text-[#33333390] bg-neutral-50 mt-10 py-10 border-t px-5 md:px-10">
                <strong>NOTE</strong>: You can leave this page and the report will appear in the reports tab. You will be redirected when it is ready.
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  if (!processing)
    return (
      <div className="scale-90 md:scale-100 mt-10 md:mt-12 w-full mx-5 md:mx-12 rounded-3xl mb-20">
        <Card className="rounded-3xl shadow-none overflow-hidden border">
          <CardHeader className="bg-neutral-100 p-4 rounded-t-3xl">
            <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={activeId === 0}
            >
              <ChevronLeft className="text-[#33333395] hover:text-[#333333] transition duration-500" />
            </Button>
            <div className="flex flex-col items-center w-60">
              <Select
                onValueChange={(value: any) => setActiveId(Number(value))}
                value={activeId.toString()} // Fix: Keep the dropdown in sync
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Question ${activeId + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  {questions.map((_, index) => (
                    <SelectItem
                      key={index}
                      value={index.toString()}
                      className="flex items-center gap-2"
                    >
                      <div className="flex gap-2 items-center">
                      Question {index + 1}
                      {completedQuestions[index] && (
                        <CheckCircle className="text-[#9aee59] w-4 h-4" />
                      )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="ghost"
              onClick={handleNext}
              disabled={activeId === questions.length - 1}
            >
              <ChevronRight className="text-[#33333395] hover:text-[#333333] transition duration-500" />
            </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-10 px-0 pb-0">
            <Question
              key={activeId}
              question={questions[activeId]}
              id={activeId}
              activeId={activeId}
              recordedBlob={blobs[activeId]} // Pass the recordedBlob from the state
              isCompleted={completedQuestions[activeId]} // Pass the completed status from the state
              completeQuestion={completeQuestion} // Completion logic passed
            />
            <div className="flex justify-between px-4 items-center w-full bg-neutral-100 h-full mt-10 py-4">
              { blobs[activeId] &&
                <div>
                  <CustomAudioPlayer src={URL.createObjectURL(blobs[activeId])} />
                </div>
              }
              { completedQuestions[completedQuestions.length-1] &&
              <Button
                onClick={handleSubmit}
                className={
                  "bg-[#9aee59] hover:bg-[#6cde12] text-[#333333] px-4 rounded-xl w-min p-2 flex gap-2 items-center justify-center hover:scale-105 transition duration-500 h-10 "
                }
              >
                <div className="px-4">Submit for Processing</div>
              </Button>
              }
              { (!(completedQuestions[completedQuestions.length-1]) && blobs[activeId] && completedQuestions[0] && !completedQuestions[completedQuestions.length-1]) &&
              <Button
                onClick={handleNext}
                className={
                  "border bg-white hover:bg-neutral-200 px-4 text-[#333333] rounded-xl w-min p-2 flex gap-2 items-center justify-center hover:scale-105 transition duration-500 h-10 "
                }
              >
                <div className="px-4">Next Question</div>
              </Button>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    );
}
