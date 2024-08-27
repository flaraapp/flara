import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';
import Image from 'next/image';
import { SubmitProps } from '@/screens/dashboard/Interview';

interface SubmitSpeechProps {
  setQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setProps: React.Dispatch<React.SetStateAction<SubmitProps>>;
}
export default function QuestionGenerator({ setQuestions, setError, setProps }: SubmitSpeechProps) {
  const [title, setTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState(3);
  const [resume, setResume] = useState('');
  const [isTechnical, setIsTechnical] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setGenerating(true);
    const form = new FormData();
    setProps({ title, jobDescription, resume, isTechnical });
    form.append('job_description', jobDescription);
    form.append('numbQuestions', numQuestions.toString());
    form.append('resume', resume);
    form.append('isTechnical', isTechnical.toString());

    try {
      fetch('https://flara--flara-backend-fastapi-endpoint.modal.run/generate_questions/', {
        method: 'POST',
        body: form,
        headers: {
          'Accept': 'application/json',
        },
      }).catch((error) => {
        console.error('Error submitting:', error);
        setGenerating(false);
        setError(true);
      }).then(res => {
        if (res)
          res.json().then((data) => {
            data = JSON.parse(data);
            const arr = Object.values(data) as string[];
            setQuestions(arr);
            setGenerating(false);
          })
      });
    } catch (error) {
      console.error('Error submitting:', error);
      setGenerating(false);
      setError(true);
    }
  };

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 3 && value <= 10) {
      setNumQuestions(value);
    }
  };

  if (generating)
    return (
        <div className='overflow-y-hidden h-screen'>
              <div className="h-[100vh] w-screen opacity-25 absolute z-[-1] top-0" style={{
        backgroundImage: "radial-gradient(at 84.9% 25.3%, #B2F260 0px, transparent 50%),radial-gradient(at 15.1% 57.5%, #4FE4C4 0px, transparent 50%),radial-gradient(at 65.4% 55.7%, #FC8C3C 0px, transparent 50%)",
    }}></div>
        <div className='flex h-[60vh] w-full justify-center items-center'>
            <div className=''>
                <div className='flex justify-center items-center w-full pb-4'>
                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin fill-[#6cde12] flex justify-center items-center" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                </div>
                <p className='text-2xl text-gray-500 animate-pulse text-center w-screen'>Generating Questions...</p>
                <div className='w-screen text-center flex justify-center'>
                    <p className='text-center w-80 text-[#22222290] mt-5'>This may take up to 30 seconds.</p>
                </div>
            </div>
        </div>
        </div>
    )
  return (
    <div>
          <div className="h-[110vh] w-screen opacity-25 absolute z-[-1] top-0" style={{
        backgroundImage: "radial-gradient(at 84.9% 25.3%, #B2F260 0px, transparent 50%),radial-gradient(at 15.1% 57.5%, #4FE4C4 0px, transparent 50%),radial-gradient(at 65.4% 55.7%, #FC8C3C 0px, transparent 50%)",
    }}></div>
      <div className="text-center flex justify-center">
        <div className="border py-1 px-4 rounded-full text-xl text-gray-500">GENERATE INTERVIEW</div>
      </div>
      <div className='w-screen flex justify-center items-center pb-20 '>
        <form className="p-10 mt-10 mx-5 md:w-[60%] bg-white bg-opacity-25 border backdrop-blur-3xl rounded-3xl py-10" onSubmit={handleSubmit}>
          <div>
            <label className="text-[#222222] text-lg font-semibold" htmlFor="title">TITLE</label>
            <input
              className="w-full py-2 px-4 focus:border-[#9aee59] focus:outline-none border-b transition duration-500 rounded-3xl"
              placeholder="Enter a title."
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <label className='text-[#222222] text-lg font-semibold' htmlFor="jobDescription">JOB DESCRIPTION</label>
            <textarea
              className="w-full py-2 focus:border-[#9aee59] border p-4 mt-2 rounded-3xl focus:outline-none border-b h-40 transition duration-500"
              placeholder="Paste job description."
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
          </div>
          <div className="mt-4">
            <div className='flex items-center'>
              <label className='text-[#222222] text-lg font-semibold' htmlFor="numQuestions">NUMBER OF QUESTIONS</label>
              <input
                className="mt-2 py-1 focus:border-[#9aee59] focus:outline-none border-b transition duration-500 text-center text-lg border rounded-3xl w-12 mx-3 mb-2 pl-[0.9rem]"
                type="number"
                min="3"
                max="10"
                value={numQuestions}
                onChange={handleNumQuestionsChange}
                required
              />
            </div>
            <input
              className="w-full py-2 focus:border-[#9aee59] focus:outline-none border-b transition duration-500"
              type="range"
              id="numQuestions"
              min="3"
              max="10"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              required
            />
          </div>
          <div className="mt-4">
            <label className='text-[#222222] text-lg font-semibold' htmlFor="resume">RESUME</label>
            <textarea
              className="w-full py-2 focus:border-[#9aee59] border p-4 mt-2 rounded-3xl focus:outline-none border-b h-40 transition duration-500"
              placeholder="Paste your resume here."
              id="resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div className="mt-4 flex items-center">
            <input
              className="mr-4 h-6 w-6 text-[#9aee59] focus:ring-[#9aee59] border-gray-300 rounded"
              type="checkbox"
              id="isTechnical"
              checked={isTechnical}
              onChange={(e) => setIsTechnical(e.target.checked)}
            />
            <label className='text-[#222222] text-lg font-semibold' htmlFor="isTechnical">TECHNICAL INTERVIEW
              <div className='text-base opacity-50 font-normal'>Questions can pertain to job specific terms and can ask you to explain technical concepts.</div>
            </label>
          </div>
          <div className="flex w-full justify-end gap-4 transition duration-500 mt-10">
            <button
              className="bg-[#9aee59] px-4 py-2 rounded-full mt-4 hover:bg-[#6cde12] transition duration-500"
              type="submit"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}