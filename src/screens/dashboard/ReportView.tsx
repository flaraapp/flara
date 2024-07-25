// @ts-expect-error
import { parse } from 'node-webvtt';
import BackButton from '@/components/dashboard/BackButton';
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

export default function ReportView({ report }: { report: Report }) {
    function formatTime(timeInSeconds: number): string {
        const roundedTime = Math.round(timeInSeconds);
        
        const minutes = Math.floor(roundedTime / 60);
        const seconds = roundedTime % 60;
        
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
    function formatDateTime(utcString: string) {
        const date = new Date(utcString);
        const formatter = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        return formatter.format(date);
      }
    const words = parse(report.transcription).cues;
    return (
    <div className='w-screen justify-center items-center mt-32'>
        <div className='md:grid md:grid-cols-2 mx-10 gap-10'>
            <div>
                <p className='text-[#22222290] text-xl -mb-2 font-semibold'>{formatDateTime(report.created_at).toUpperCase()}</p>
                <h1 className='text-5xl text-wrap mb-18'>{report.title}</h1>
                <Rating rating={report.rating}></Rating>
                <div className='flex gap-2 text-4xl items-end font-light mt-8'>
                    <p className='text-[#22222290] text-2xl font-semibold'>WPM</p> {report.wpm}
                </div>
                <p className='text-[#22222290] text-xl -mb-1 font-semibold mt-20'>FEEDBACK</p>
                <div className='text-lg leading-8'>{report.feedback}</div>
            </div>
            <div>
                <div className='mb-20 mt-10 md:mt-0 min-h-[70vh]'>
                    {
                        words.map((word: any) => (
                            <div key={word.text} className='mb-3 md:mx-8 md:hover:outline outline-[#e8e4ec] rounded-2xl hover:outline-1 md:p-2 transition duration-500'>
                                <p className='text-[#22222290] -mb-2 font-semibold'>{formatTime(word.start)}</p>
                                <p className={`text-[#222222] text-lg`}>
                                    {word.text}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        <BackButton/>
    </div>
  );
}

export function Rating({ rating }: { rating: string }) { 
    switch (rating) {
      case 'Developing':
        return (
          <div className='flex items-center'>
            <div className='scale-[2] ml-4'>
              <div className='flex justify-center items-center'>
                <div className='border-[#FC8C3C] border-2 h-3 w-3 rounded-full'></div>
              </div>
              <div className='flex justify-between items-center gap-0.5'>
                <div className='bg-[#4FE4C4] h-3 w-3 rounded-full'></div>
                <div className='border-[#B2F260] border-2 h-3 w-3 rounded-full'></div>
              </div>
            </div>
            <p className='text-2xl ml-6 mb-1 font-light'>Developing</p>
          </div>
        );
      case 'Competent':
        return (
          <div className='flex items-center'>
            <div className='scale-[2] ml-4'>
              <div className='flex justify-center items-center'>
                <div className='bg-[#FC8C3C] h-3 w-3 rounded-full'></div>
              </div>
              <div className='flex justify-between items-center gap-0.5'>
                <div className='bg-[#4FE4C4] h-3 w-3 rounded-full'></div>
                <div className='border-[#B2F260] border-2 h-3 w-3 rounded-full'></div>
              </div>
            </div>
            <p className='text-2xl ml-6 mb-1 font-light'>Competent</p>
          </div>
        );
      case 'Outstanding':
        return (
          <div className='flex items-center'>
            <div className='scale-[2] ml-4'>
              <div className='flex justify-center items-center'>
                <div className='bg-[#FC8C3C] h-3 w-3 rounded-full'></div>
              </div>
              <div className='flex justify-between items-center gap-0.5'>
                <div className='bg-[#4FE4C4] h-3 w-3 rounded-full'></div>
                <div className='bg-[#B2F260] h-3 w-3 rounded-full'></div>
              </div>
            </div>
            <p className='text-2xl ml-6 mb-1 font-light'>Outstanding</p>
          </div>
        );
    }
  }