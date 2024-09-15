'use client';
import Dashboard, { usePageStore } from "@/screens/dashboard/Dashboard";
import ReportsContent from "@/screens/dashboard/Reports";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
export default function Reports() {
  const setPage = () => usePageStore.setState({page: 'reports'});
  useEffect(() => {
    setPage();
  }, []);
  const { user, error, isLoading } = useUser();
  return  user && <ReportsContent user={user}/>;
}