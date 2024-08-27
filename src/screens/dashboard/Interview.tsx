import QuestionContainer from '@/components/dashboard/interview/QuestionContainer';
import ErrorScreen from '../state/Error';
import QuestionGeneration from '@/components/dashboard/interview/QuestionGeneration';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Dispatch, SetStateAction, useState } from 'react';

interface InterviewProps {
    user: UserProfile;
}
export interface SubmitProps {
  title: string;
  isTechnical: boolean;
  jobDescription: string;
  resume: string;
}
export default function InterviewContent({user}: InterviewProps) {
  const [questions, setQuestions] = useState() as [string[], Dispatch<SetStateAction<string[]>>];
  const [error, setError] = useState(false);
  const [props, setProps] = useState() as [SubmitProps, Dispatch<SetStateAction<SubmitProps>>];
  console.log(props);
  if (error) {
    <ErrorScreen error={{name: "500", message: "An unexpected error was encountered. Please try again."}}/>
  }
  if (questions) return (
    <QuestionContainer setError={setError} props={props} questions={questions}/>
  )
  return (
    <>
    <div></div>
    <div className='flex justify-center items-center mt-28'>
      <QuestionGeneration setProps={setProps} setQuestions={setQuestions} setError={setError}/>
    </div>
    </>
  );
}