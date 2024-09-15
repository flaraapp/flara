'use client';
import ErrorScreen from "@/app/not-found";
import { client } from "@/supabase/client"
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import LoadingScreen from "@/screens/state/Loading"
import ReportView from "@/screens/dashboard/ReportView";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { usePageStore } from "@/screens/dashboard/Dashboard";

interface Report {
    id: number | string;
    created_at: string;
    feedback: string;
    rating: string;
    wpm: number;
    transcription: string;
    pending: boolean;
    title: string;
    user_id: string;
  }
export default function SpeechReport({ params }: { params: { slug: string } }) {
    const setPage = () => usePageStore.setState({page: 'reports'});
    useEffect(() => {
      setPage();
    }, []);
    const { user } = useUser();
    const [report, setReport] = useState() as any;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        client.from('speech_reports').select().eq("id", params.slug).then(res => {
            if (res.data) {
                if (res.data[0]) {
                    if (res.data[0].user_id != user?.sub) setError(true);
                    setReport(res.data[0]);
                    setLoading(false);
                }
                else return setError(true);
            } else return setError(true);
        });
    }, [params.slug, user?.sub]);
    if (report && user) {
        return (
                <ReportView report={report}/>
        )
    } 
    if (loading && !error)
        return
            <LoadingScreen/>
    if (error || report.pending)
        return <ErrorScreen/>;

    // fix error and loading (different loading anim with wireframe pulse?)
}