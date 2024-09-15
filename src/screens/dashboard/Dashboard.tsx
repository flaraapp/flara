'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../state/Loading';
import ErrorScreen from '../state/Error';
import UserMenu from '@/components/dashboard/UserMenu';
import MenuBar from '@/components/dashboard/MenuBar';
import ReportsContent from './Reports';
import { client } from '@/supabase/client';
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import InterviewContent from './Interview';
import SpeechContent from './Speech';

import { create } from 'zustand'

export const usePageStore = create((set) => ({
  page: "reports",
  setPage: (page: string) => set((state: { page: string; }) => ({ page: page })),
}))

export default function Dashboard() {
  const page = usePageStore((state: any) => state.page)
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
      <DashboardLayout user={user}>
        {page == 'reports' && <ReportsContent user={user}/>}
        {page == 'speech' && <SpeechContent user={user}/>}
        {page == 'interview' && <InterviewContent user={user}/>}
      </DashboardLayout>
    )
  );
}