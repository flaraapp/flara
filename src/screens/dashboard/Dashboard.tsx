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
      <div>
        <UserMenu user={user}/>
        <MenuBar activePage={'reports'}/>
        <ReportsContent user={user}/>
      </div>
    )
  );
}