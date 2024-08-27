'use client';
import ErrorScreen from "@/app/not-found";
import { client } from "@/supabase/client"
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import LoadingScreen from "@/screens/state/Loading"
import UserMenu from "@/components/dashboard/UserMenu";
import MenuBar from "@/components/dashboard/MenuBar";
import ReportViewInterview from "@/screens/dashboard/ReportViewInterview";
export default function InterviewReport({ params }: { params: { slug: string } }) {
    const { user } = useUser();
    const [report, setReport] = useState() as any;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
        client.from('interview_reports').select().eq("id", params.slug).then(res => {
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
    console.log(report);
    if (report && user) {
        return (
            <div>
                <UserMenu user={user}/>
                <MenuBar activePage={'reports'}/>
                <ReportViewInterview report={report}/>
            </div>
        )
    } 
    if (loading && !error)
        return <LoadingScreen>
            { user &&
                <UserMenu user={user}/>
            }
            <MenuBar activePage={'reports'}/>
        </LoadingScreen>;
    if (error || report.pending)
        return <ErrorScreen/>;

    // fix error and loading (different loading anim with wireframe pulse?)
}