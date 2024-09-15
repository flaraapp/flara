'use client';

import Dashboard, { usePageStore } from '@/screens/dashboard/Dashboard';
import SpeechContent from '@/screens/dashboard/Speech';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
export default function Speech() {
  const setPage = () => usePageStore.setState({page: 'speech'});
  useEffect(() => {
    setPage();
  }, []);
  const { user, error, isLoading } = useUser();
  return (
    user && <SpeechContent user={user}/>
  )
}
