import { useState } from "react";
import Question from "./Question";
import { useUser } from "@auth0/nextjs-auth0/client";
import { SubmitProps } from "@/screens/dashboard/Interview";
import { useRouter } from "next/navigation";
import Image from "next/image";
interface Props {
  questions: string[];
  props: SubmitProps;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function QuestionContainer({ questions, props, setError }: Props) {
  const [activeId, setActiveId] = useState(0);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const [blobs, setBlobs] = useState(new Array<Blob>(questions.length));
  const { user } = useUser();

  const completeQuestion = (rec: Blob, id: number) => {
    setBlobs([...blobs.slice(0, id), rec, ...blobs.slice(id + 1)]);
    if (id === activeId) setActiveId(id + 1);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    
    blobs.forEach((blob, index) => {
      formData.append('files', blob, `file${index}.wav`);
    });

    questions.forEach((question) => {
      formData.append('questions', question);
    });

    formData.append('user_sub', user?.sub || '');
    formData.append('title', props.title);
    formData.append('isVideo', "false");
    formData.append('isTechnical', (props.isTechnical || false) + "");
    formData.append('job_description', props.jobDescription);
    formData.append('resume', props.resume || 'Nothing');

    try {
      setProcessing(true);
      const response = fetch('https://flara--flara-backend-fastapi-endpoint.modal.run/process_interview/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
        },
        body: formData
      }).then(response => {
        response.json().then(data => {
          if (data.error) {
            setProcessing(false);
            setError(true);
          } else {
            setProcessing(false);
            router.push('/dashboard/reports/interview/' + data);
          }
        })
      });
    } catch (error) {
      setProcessing(false);
      setError(true);
    }
  };
  if (processing) 
    return (
        <div>
        <div className='flex h-[70vh] md:h-[85vh] w-full justify-center items-center'>
            <div className=''>
                <div className='flex justify-center items-center w-full pb-4'>
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin fill-[#6cde12] flex justify-center items-center" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                <p className='text-2xl text-gray-500 animate-pulse text-center w-screen'>Processing...</p>
                <div className='w-screen text-center flex justify-center'>
                    <p className='text-center w-80 text-[#22222290] mt-10'>Processing may take up to two minutes. You can leave this page and view the results later in reports.</p>
                </div>
            </div>
        </div>
        <div className='w-full flex items-center justify-center'>
            <Image
                src={require('../../../../public/flara.svg')}
                alt={"Flara"}
                width={135}
                height={50}
                className="select-none drag-none fixed"
            />
        </div>
        </div>
    )
  if (!processing)
  return (
    <div className="flex flex-col items-center justify-center mt-20 pb-20">
      <div className="mx-10 md:mx-40 pb-10">
        {questions.map((question, index) => (
          <Question
            key={index}
            question={question}
            id={index}
            activeId={activeId}
            completeQuestion={completeQuestion}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className={" bg-[#B2F260] px-4 rounded-full w-min p-2 flex gap-2 items-center justify-center hover:scale-105 transition duration-500 h-10 mt-2 " +
        ((activeId < questions.length) ? "hidden" : "")}
      >
        Submit
      </button>
    </div>
  );
}