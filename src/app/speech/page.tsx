'use client';

import Dashboard, { usePageStore } from '@/screens/dashboard/Dashboard';
import { useEffect } from 'react';
export default function Speech() {
  const setPage = () => usePageStore.setState({page: 'speech'});
  useEffect(() => {
    setPage();
  }, []);
  return (
    <Dashboard/>
    )
}
