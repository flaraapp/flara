'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '@/screens/state/Loading';
import ErrorScreen from '@/screens/state/Error';
import { client } from '@/supabase/client';
import { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { create } from 'zustand'
import ReportsContent from '@/screens/dashboard/Reports';
import SpeechContent from '@/screens/dashboard/Speech';
import InterviewContent from '@/screens/dashboard/Interview';
import { useRouter } from 'next/navigation';

export const usePageStore = create((set) => ({
  page: "reports",
  setPage: (page: string) => set((state: { page: string; }) => ({ page: page })),
}))

export default function Layout({ children }: { children: React.ReactNode }) {
  const page = usePageStore((state: any) => state.page)
  const { user, error, isLoading } = useUser();
  const router = useRouter();
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
  if (!user) return router.push('/');
  return (
    user && (
      <DashboardLayout user={user}>
        {children}
      </DashboardLayout>
    )
  );
}