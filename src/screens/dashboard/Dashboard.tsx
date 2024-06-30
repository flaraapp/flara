'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../state/Loading';
import ErrorScreen from '../state/Error'
import BottomBar from '@/components/dashboard/BottomBar';
import UserMenu from '@/components/dashboard/UserMenu';
export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  
  if (isLoading) return <LoadingScreen/>
  if (error) return <ErrorScreen error={error}/>;

  return (
    user && (
      <div>
        <UserMenu user={user}/>
        {/* <BottomBar /> */}
      </div>
    )
  );
}