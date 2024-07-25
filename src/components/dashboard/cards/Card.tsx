'use client';

import Link from 'next/link';
import { GoArrowRight } from 'react-icons/go';

interface CardData {
  id: number | string;
  created_at: string;
  feedback: string;
  rating: string;
  wpm: number;
  transcription: string;
  pending: boolean;
  title: string;
}

interface CardProps {
  data: CardData;
  type: string;
}
export default function Card({ data, type }: CardProps) {
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
  if (data.pending) return (
    <div className="p-4 border border-yellow-300 bg-yellow-50 rounded-2xl cursor-pointer w-80 h-full transition duration-500">
      <div>
        <p className='text-[#22222290] text-md -mb-2 font-semibold'>{formatDateTime(data.created_at).toUpperCase()}</p>
        <p className='text-xl text-wrap line-clamp-1 mb-4'>{data.title}</p>
        <div className='flex items-center'>
          <div className='animate-pulse'>
            <div className='flex justify-center items-center'>
              <div className='bg-yellow-300 h-3 w-3 rounded-full'></div>
            </div>
            <div className='flex justify-between items-center gap-0.5'>
              <div className='bg-yellow-300 h-3 w-3 rounded-full'></div>
              <div className='bg-yellow-300 h-3 w-3 rounded-full'></div>
            </div>
          </div>
          <p className='text-lg ml-2 mb-1'>Processing</p>
        </div>
        <p className='text-[#22222290] text-sm font-semibold mt-4 line-clamp-3 text-wrap'>THIS REPORT IS CURRENTLY PROCESSING. PLEASE CHECK BACK LATER TO VIEW THE REPORT.</p>
        <div className='flex w-full justify-end items-center mt-2  opacity-75 text-[#22222290] text-sm font-semibold text-right gap-1 duration-500 transition-all'>
          <p className='text-sm font-semibold text-right'>VIEW REPORT</p>
          <GoArrowRight></GoArrowRight>
        </div>
      </div>
    </div>
  );
  return (
    <Link href={`/reports/${type}/${data.id}`}>
      <div className="p-4 bg-white border rounded-2xl cursor-pointer w-80 h-full transition duration-500 hover:bg-neutral-100">
        <div>
          <p className='text-[#22222290] text-md -mb-2 font-semibold'>{formatDateTime(data.created_at).toUpperCase()}</p>
          <p className='text-xl text-wrap line-clamp-1 mb-4'>{data.title}</p>
          <Rating rating={data.rating}></Rating>
          <p className='text-[#22222290] text-sm font-semibold mt-4'>FEEDBACK PREVIEW</p>
          <p className='text-sm text-wrap line-clamp-3 leading-4'>{data.feedback}</p>
          <div className='flex w-full justify-end items-center mt-2 text-[#22222290] text-sm font-semibold text-right gap-1 hover:text-[#222222] duration-500 transition-all'>
            <p className='text-sm font-semibold text-right'>VIEW REPORT</p>
            <GoArrowRight></GoArrowRight>
          </div>
        </div>
      </div>
    </Link>
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