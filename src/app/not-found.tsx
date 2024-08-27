'use client';
import Image from 'next/image';
import Button from '@/components/button/Button';

export default function ErrorScreen() {
    return (
        <div className=''>
        <div className='flex h-[75vh] md:h-[90vh] w-full justify-center items-center'>
            <div className='grid grid-rows-3 mx-6'>
                <span className='text-6xl text-gray-700 text-center pb-5'>404</span>
                <span className='text-xl text-gray-500 text-center'>We couldn&apos;t find the page you were looking for.</span>
                <div className='h-full flex mb-5 items-center w-full justify-center'>
                    <Button text='Return home' href='/' type='primary'></Button>
                </div>
            </div>  
        </div>
        <div className='w-full flex items-center justify-center'>
            <Image
                src={require('../../public/flara.svg')}
                alt={"Flara"}
                width={135}
                height={50}
                className="select-none drag-none fixed"
            />
        </div>
        </div>
  )
}