// @ts-expect-error
import { parse } from 'node-webvtt';
import BackButton from '@/components/dashboard/BackButton';
import QuestionDropdown from '@/components/dashboard/interview/QuestionDropdown';
interface Report {
    id: number | string;
    created_at: string;
    overall_feedback: string;
    overall_rating: string;
    overall_wpm: number;
    wpms: string;
    transcriptions: string;
    ratings: string;
    feedbacks: string;
    sample_responses: string;
    questions: string;
    pending: boolean;
    title: string;
    user_id: string;
}
interface QuestionData {
    id: number;
    question: string;
    transcription: any;
    rating: string;
    feedback: string;
    wpm: string;
    sample_response: string;
}
export default function ReportViewInterview({ report }: { report: Report }) {
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
    const questions = JSON.parse(report.questions);
    const transcriptions = JSON.parse(report.transcriptions);
    const ratings = JSON.parse(report.ratings);
    const feedbacks = JSON.parse(report.feedbacks);
    const wpms = JSON.parse(report.wpms);
    const sample_responses = JSON.parse(report.sample_responses);
    const questionDatas = new Array<QuestionData>();
    questions.forEach((question: string, index: number) => {
        const questionData: QuestionData = {
            id: index + 1,
            question: question,
            transcription:  parse(transcriptions[index]).cues,
            rating: ratings[index],
            feedback: feedbacks[index],
            wpm: wpms[index],
            sample_response: sample_responses[index] ,
        }
        questionDatas.push(questionData);
    })
    const words = parse(JSON.parse(report.transcriptions)[0]).cues;
    return (
    <div className='w-screen justify-center items-center mt-32'>
        <div className='md:grid md:grid-cols-2 mx-10 gap-10'>
            <div>
                <p className='text-[#22222290] text-xl -mb-2 font-semibold'>{formatDateTime(report.created_at).toUpperCase()}</p>
                <h1 className='text-5xl text-wrap mb-18'>{report.title}</h1>
                <Rating rating={report.overall_rating}></Rating>
                <div className='flex gap-2 text-4xl items-end font-light mt-8'>
                    <p className='text-[#22222290] text-2xl font-semibold'>OVERALL WPM</p> {report.overall_wpm}
                </div>
                <p className='text-[#22222290] text-xl -mb-1 font-semibold mt-20'>OVERALL FEEDBACK</p>
                <div className='text-lg leading-8'>{report.overall_feedback}</div>
            </div>
            <div>
                <div className='mb-20 mt-10 md:mt-0 min-h-[70vh]'>
                    {questionDatas.map((questionData: QuestionData) => {
                        return <QuestionDropdown key={questionData.id} q={questionData}></QuestionDropdown>
                    })}
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