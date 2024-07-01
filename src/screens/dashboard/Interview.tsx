import { UserProfile } from '@auth0/nextjs-auth0/client';

interface InterviewProps {
    user: UserProfile;
}
export default function InterviewContent({user}: InterviewProps) {
  return (
    <div className='h-screen w-sceen flex justify-center items-center'>Interview</div>
  );
}