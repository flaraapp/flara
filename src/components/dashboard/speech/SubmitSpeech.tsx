'use client';

import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import Image from 'next/image'
import { client } from "@/supabase/client";
import { useRouter } from "next/navigation";

interface SubmitSpeechProps {
    blob: Blob
    blobUrl: string;
    isVideo: boolean;
    setBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
    setBlobUrl: React.Dispatch<React.SetStateAction<string | null>>;
    setError: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SubmitSpeech({ blob, blobUrl, isVideo, setBlob, setBlobUrl, setError}: SubmitSpeechProps) {
    const [title, setTitle] = useState('');
    const router = useRouter();
    const [context, setContext] = useState('');
    const { user, error, isLoading } = useUser();
    const [processing, setProcessing] = useState(false);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = new FormData();
        form.append('file', blob);
        form.append('context', context || "nothing");
        form.append('user_sub', user?.sub + "");
        form.append('title', title || "Untitled");
        form.append('isVideo', isVideo + "");

        try {
            fetch('https://flara--flara-db-fastapi-endpoint.modal.run/process_speech/', {
              method: 'POST',
              body: form,
              mode: 'no-cors',
              headers: {
                'Accept': 'application/json',
              },
            }).catch((error) => {
              console.error('Error submitting speech:', error);
              setProcessing(false);
              setError(true);
              setBlob(null);
              setBlobUrl(null);
            }).then(res => {
                setProcessing(false);
                setBlob(null);
                setBlobUrl(null);
                setError(false);
                client.from('speech_reports').select().eq('user_id', user?.sub).order('created_at', { ascending: false }).then(res => {
                    if (res.data) {
                        if (!res.data[0].pending)
                            router.push("/dashboard/reports/speech/" + res.data[0].id);
                        else {
                            console.error('Error submitting speech:', res);
                            setError(true);
                        }
                    }
                })
            });
            setProcessing(true);
          } catch (error) {
            console.error('Error submitting speech:', error);
            setProcessing(false);
            setError(true);
            setBlob(null);
            setBlobUrl(null);
          }
    };
    const handleCancel = () => {
        setBlob(null);
        setBlobUrl(null);
    };
    if (processing) 
        return (
            <div>
            <div className='flex h-[70vh] md:h-[85vh] w-full justify-center items-center'>
                <div className=''>
                    <div className='flex justify-center items-center w-full pb-4'>
                        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin fill-[#6cde12] flex justify-center items-center" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                    </div>
                    <p className='text-2xl text-gray-500 animate-pulse text-center w-screen'>Processing...</p>
                    <div className='w-screen text-center flex justify-center'>
                        <p className='text-center w-80 text-[#22222290] mt-10'>Processing may take up to two minutes. You can leave this page and view the results later in reports.</p>
                    </div>
                </div>
            </div>
            <div className='w-full flex items-center justify-center'>
                <Image
                    src={require('../../../../public/flara.svg')}
                    alt={"Flara"}
                    width={135}
                    height={50}
                    className="select-none drag-none fixed"
                />
            </div>
            </div>
        )
    if (!processing)
        return (
        <div className="md:grid grid-cols-2 h-screen w-screen">
            <div className={"flex justify-center items-center md:mt-0 " + (isVideo ? "mt-80": "mt-10")}>
                <video className={"rounded-xl w-[80%] " + (isVideo ? "mt-0" : "md:-mt-40")} playsInline src={blobUrl} controls></video>
            </div>
            <div className="md:h-screen">
                <div className="flex items-center justify-center mt-20 md:mt-0 md:h-screen">
                <form className="border p-10 rounded-3xl w-[80%]" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-[#222222] text-xl font-semibold" htmlFor="title">Title</label>
                            <input
                                className="w-full py-2 focus:border-[#9aee59] focus:outline-none border-b transition duration-500"
                                placeholder="Enter a title."
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label className='text-[#222222] text-xl font-semibold' htmlFor="context">Context</label>
                            <textarea
                                className="w-full py-2 focus:border-[#9aee59] focus:outline-none border-b h-40 transition duration-500"
                                placeholder="Provide some brief context regarding the speech and it's purpose."
                                id="context"
                                value={context}
                                onChange={(e) => setContext(e.target.value)}
                            />
                        </div>
                        <div className="flex w-full justify-end gap-4 transition duration-500">
                        <button 
                                className="border-red-500 hover:bg-red-100 text-red-500 border px-4 rounded-full mt-4 py-2 transition duration-500"
                                onClick={()=>handleCancel()}>Cancel</button>
                            <button 
                                className="bg-[#9aee59] px-4 py-2 rounded-full mt-4 hover:bg-[#6cde12] transition duration-500"
                                type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}