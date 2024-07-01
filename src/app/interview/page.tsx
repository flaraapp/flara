'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../../screens/state/Loading';
import ErrorScreen from '../../screens/state/Error'
import UserMenu from '@/components/dashboard/UserMenu';
import MenuBar from '@/components/dashboard/MenuBar';
import { useRouter } from 'next/navigation';
import InterviewContent from '@/screens/dashboard/Interview';
export default function Interview() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error}/>;
  if (!user) router.push("/api/auth/login")
  return (
    user && (
      <div>
        <UserMenu user={user}/>
        <MenuBar activePage={'interview'}/>
        <InterviewContent user={user}/>
      </div>
    )
  );
}