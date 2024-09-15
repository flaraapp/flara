'use client';
import Dashboard, { usePageStore } from "@/screens/dashboard/Dashboard";
import { useEffect } from "react";
export default function Reports() {
  const setPage = () => usePageStore.setState({page: 'reports'});
  useEffect(() => {
    setPage();
  }, []);
  return <Dashboard/>
}