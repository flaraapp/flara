'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import InterviewContent from '@/screens/dashboard/Interview';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import Dashboard, { usePageStore } from '@/screens/dashboard/Dashboard';
import { useEffect } from 'react';
export default function Interview() {
  const setPage = () => usePageStore.setState({page: 'interview'});
  useEffect(() => {
    setPage();
  }, []);
  const { user, error, isLoading } = useUser();
  return (
    user && <InterviewContent user={user}/>
  );
}