'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../../screens/state/Loading';
import ErrorScreen from '../../screens/state/Error'
import UserMenu from '@/components/dashboard/UserMenu';
import MenuBar from '@/components/dashboard/MenuBar';
import { useRouter } from 'next/navigation';
import SpeechContent from '@/screens/dashboard/Speech';
export default function Speech() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error}/>;
  if (!user) router.push("/api/auth/login")
  return (
    user && (
      <div>
        <UserMenu user={user}/>
        <MenuBar activePage={'speech'}/>
        <SpeechContent user={user}/>
      </div>
    )
  );
}