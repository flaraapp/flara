import { UserProfile } from '@auth0/nextjs-auth0/client';

interface ReportsProps {
    user: UserProfile;
}
export default function ReportsContent({user}: ReportsProps) {
  return (
    <div className='h-screen w-sceen flex justify-center items-center'>Reports</div>
  );
}