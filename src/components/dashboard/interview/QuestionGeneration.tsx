import { UserProfile } from '@auth0/nextjs-auth0/client';
import { useState } from 'react';

interface InterviewProps {
    user: UserProfile;
}

export default function QuestionGenerator({ user }: InterviewProps) {
  const [title, setTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [numQuestions, setNumQuestions] = useState(3);
  const [resume, setResume] = useState('');
  const [isTechnical, setIsTechnical] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    form.append('job_description', jobDescription);
    form.append('numbQuestions', numQuestions.toString());
    form.append('resume', resume);
    form.append('isTechnical', isTechnical.toString());

    try {
      fetch('https://flara--flara-hub-fastapi-endpoint.modal.run/generate_questions/', {
        method: 'POST',
        body: form,
        headers: {
          'Accept': 'application/json',
        },
      }).catch((error) => {
        console.error('Error submitting:', error);

      }).then(res => {
        if (res)
          res.json().then((data) => {
          console.log('Submitted:', data);
          })
      });
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const handleNumQuestionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 3 && value <= 10) {
      setNumQuestions(value);
    }
  };

  return (
    <div>
      <div className="text-center flex justify-center">
        <div className="border py-1 px-4 rounded-full text-xl text-gray-500">GENERATE INTERVIEW</div>
      </div>
      <div className='w-screen flex justify-center items-center pb-20 '>
        <form className="p-10 py-0 mt-10 mx-5 md:w-[60%] border-l-2 border-[#9aee59]" onSubmit={handleSubmit}>
          <div>
            <label className="text-[#222222] text-lg font-semibold" htmlFor="title">TITLE</label>
            <input
              className="w-full py-2 px-4 focus:border-[#9aee59] focus:outline-none border-b transition duration-500"
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
              required
            />
          </div>
          <div className="mt-4 flex items-center">
            <input
              className="mr-4 h-6 w-6 text-[#9aee59] focus:ring-[#9aee59] border-gray-300 rounded"
              type="checkbox"
              id="isTechnical"
              checked={isTechnical}
              onChange={(e) => setIsTechnical(e.target.checked)}
              required
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