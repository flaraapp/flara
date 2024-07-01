import { UserProfile } from '@auth0/nextjs-auth0/client';

interface SpeechProps {
    user: UserProfile;
}
export default function SpeechContent({user}: SpeechProps) {
  return (
    <div className='h-screen w-sceen flex justify-center items-center'>Speech</div>
  );
}