'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../state/Loading';
import ErrorScreen from '../state/Error'
import UserMenu from '@/components/dashboard/UserMenu';
import MenuBar from '@/components/dashboard/MenuBar';
export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error}/>;

  return (
    user && (
      <div>
        <UserMenu user={user}/>
        {/* <BottomBar /> */}
        <MenuBar/>
      </div>
    )
  );
}