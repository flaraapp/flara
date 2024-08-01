'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../state/Loading';
import ErrorScreen from '../state/Error';
import UserMenu from '@/components/dashboard/UserMenu';
import MenuBar from '@/components/dashboard/MenuBar';
import ReportsContent from './Reports';
import { client } from '@/supabase/client';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    if (user) {
      client.from('user').select().eq("user_id", user?.sub).then(res => {
        if (res.data?.length === 0) {
          client.from('user').insert([{user_id: user?.sub, email: user?.email, username: user?.email}]).then(res => {
            if (res.error) {
              console.log(res.error)
            }
          })
        }
      })
    }
  })
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error}/>;

  return (
    user && (
      <>
      <div className="h-[110vh] w-screen opacity-25 absolute z-[-1] top-0" style={{
            backgroundImage: "radial-gradient(at 84.9% 25.3%, #B2F260 0px, transparent 50%),radial-gradient(at 15.1% 57.5%, #4FE4C4 0px, transparent 50%),radial-gradient(at 65.4% 55.7%, #FC8C3C 0px, transparent 50%)",
        }}></div>
      <div>
        <UserMenu user={user}/>
        <MenuBar activePage={'reports'}/>
        <ReportsContent user={user}/>
      </div>
      </>
    )
  );
}