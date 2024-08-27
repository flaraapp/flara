import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsChevronDown } from 'react-icons/bs';

interface QuestionData {
  id: number;
  question: string;
  transcription: any;
  rating: string;
  feedback: string;
  wpm: string;
  sample_response: string;
}

interface Props {
  q: QuestionData;
}

export default function QuestionDropdown({ q }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  let words = "";
  q.transcription
   .forEach((word: { text: any; }) => {
      words = words + " " + word.text;
    });
  return (
    <div className="w-full border rounded-3xl mb-4">
      <button
        className="w-full flex justify-between items-center p-4 text-2xl text-left"
        onClick={toggleDropdown}
      >
        {q.id + '. ' + q.question}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <BsChevronDown />
        </motion.div>
      </button>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ opacity: { duration: 0.2 }, height: { duration: 0.3 } }}
        className="overflow-hidden"
      >
    <div className='text-lg leading-8 p-4'>
    <Rating rating={q.rating}/>
    <div className='flex gap-2 items-center'>
    <p className='text-[#22222290] text-lg font-semibold'>WPM</p>
    <div className='text-base'>{q.wpm}</div>
    </div>
    <p className='text-[#22222290] text-lg -mb-1 font-semibold mt-4'>TRANSCRIPTION</p>
    <div className='text-base'>{words}</div>

    <p className='text-[#22222290] text-lg -mb-1 font-semibold mt-2'>FEEDBACK</p>
    <div className='text-base'>{q.feedback}</div>


    <p className='text-[#22222290] text-lg -mb-1 font-semibold mt-2'>SAMPLE RESPONSE</p>
    <div className='text-base'>{q.sample_response}</div>
    </div>
        </motion.div>
    </div>
  );
}

export function Rating({ rating }: { rating: string }) { 
    switch (rating) {
      case 'Developing':
        return (
          <div className='flex items-center'>
            <div>
              <div className='flex justify-center items-center'>
                <div className='border-[#FC8C3C] border-2 h-3 w-3 rounded-full'></div>
              </div>
              <div className='flex justify-between items-center gap-0.5'>
                <div className='bg-[#4FE4C4] h-3 w-3 rounded-full'></div>
                <div className='border-[#B2F260] border-2 h-3 w-3 rounded-full'></div>
              </div>
            </div>
            <p className='text-lg ml-2 mb-1'>Developing</p>
          </div>
        );
      case 'Competent':
        return (
          <div className='flex items-center'>
            <div>
              <div className='flex justify-center items-center'>
                <div className='bg-[#FC8C3C] h-3 w-3 rounded-full'></div>
              </div>
              <div className='flex justify-between items-center gap-0.5'>
                <div className='bg-[#4FE4C4] h-3 w-3 rounded-full'></div>
                <div className='border-[#B2F260] border-2 h-3 w-3 rounded-full'></div>
              </div>
            </div>
            <p className='text-lg ml-2 mb-1'>Competent</p>
          </div>
        );
      case 'Outstanding':
        return (
          <div className='flex items-center'>
            <div>
              <div className='flex justify-center items-center'>
                <div className='bg-[#FC8C3C] h-3 w-3 rounded-full'></div>
              </div>
              <div className='flex justify-between items-center gap-0.5'>
                <div className='bg-[#4FE4C4] h-3 w-3 rounded-full'></div>
                <div className='bg-[#B2F260] h-3 w-3 rounded-full'></div>
              </div>
            </div>
            <p className='text-lg ml-2 mb-1'>Outstanding</p>
          </div>
        );
    }
  }