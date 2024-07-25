'use client';

import CardContainer from '@/components/dashboard/cards/CardContainer';
import { client } from '@/supabase/client';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useState, useEffect } from 'react';

interface ReportsProps {
    user: UserProfile;
}
export default function ReportsContent({user}: ReportsProps) {
  const [dataSpeech, setDataSpeech] = useState([]);
  const [dataInterview, setDataInterview] = useState([]);
  useEffect(() => {
      return () => {
        client.from('speech_reports')
          .select()
          .eq("user_id", user?.sub)
          .order('created_at', { ascending: false })
          .then(res => { setDataSpeech(res.data as any) });
        client.from('interview_reports')
          .select()
          .eq("user_id", user?.sub)
          .order('created_at', { ascending: false })
          .then(res => { setDataInterview(res.data as any) });
      };
    });
  console.log(dataSpeech);
  console.log(dataInterview);
  return (
    <div className='mt-36 w-screen'>
      <h1 className='text-3xl font-light mx-5'>Speech</h1>
      <CardContainer data={dataSpeech} type="speech" />
      <h1 className='text-3xl font-light mx-5 mt-10'>Interview</h1>
      <CardContainer data={dataInterview} type="interview" />
    </div>
  );
}