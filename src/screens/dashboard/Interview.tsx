import QuestionGeneration from '@/components/dashboard/interview/QuestionGeneration';
import { UserProfile } from '@auth0/nextjs-auth0/client';

interface InterviewProps {
    user: UserProfile;
}
export default function InterviewContent({user}: InterviewProps) {
  return (
    <div className='flex justify-center items-center mt-28'>
      <QuestionGeneration user={user}/>
    </div>
  );
}