'use client';

import Link from 'next/link';
import Card from './Card';
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
interface CardContainerProps {
  type: 'speech' | 'interview';
  data: CardData[];
}

export default function CardContainer({ type, data }: CardContainerProps) {
  return (
    <div className="overflow-x-scroll whitespace-nowrap flex mt-5 max-w-screen pb-4">
      <div className='h-60 mx-4'>
        <Link href={`/${type}`}>
          <div className="p-4 bg-white border rounded-2xl cursor-pointer h-full flex justify-center items-center w-40 text-[#22222290] hover:text-[#222222] hover:bg-neutral-100 transition duration-500">
            <div className='w-full h-full flex items-center justify-center'>
              <div className=''>
                <p className='text-center text-5xl font-extralight -mt-4'>+</p>
                <h2 className="text-lg font-light">New {type.charAt(0).toUpperCase() + type.slice(1)}</h2>
              </div>
            </div>
          </div>
        </Link>
      </div>
      {data && data.map(card => (
        <div key={card.id} className='mr-4'>
          <Card type={type} data={card}/>
        </div>
      ))}
    </div>
  );
}
