'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingScreen from '../../screens/state/Loading';
import ErrorScreen from '../../screens/state/Error'
import { useRouter } from 'next/navigation';
import Dashboard from "@/screens/dashboard/Dashboard";
export default function Reports() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error}/>;
  if (!user) router.push("/api/auth/login")

  return (
    user && (
      <Dashboard/>
    )
  );
}