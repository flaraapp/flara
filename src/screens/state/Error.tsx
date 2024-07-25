import Image from 'next/image';
import Button from '@/components/button/Button';

interface ErrorProps {
    error: Error;
}

export default function ErrorScreen({error}: ErrorProps) {
    return (
        <div className=''>
        <div className='flex h-[75vh] md:h-[90vh] w-full justify-center items-center'>
            <div className='grid grid-rows-4'>
                <span className='text-2xl text-gray-700 text-center'>We&apos;re sorry, an error has occured.</span>
                <span className='text-xl text-gray-500 text-center'>Please try again later.</span>
                <span className='text-md text-red-500 text-center'>{error.message}</span>
                <div className='h-full flex mb-5 items-center w-full justify-center'>
                    <Button text='Return home' href='/home' type='primary'></Button>
                </div>
            </div>
        </div>
        <div className='w-full flex items-center justify-center'>
            <Image
                src={"flara.svg"}
                alt={"Flara"}
                width={135}
                height={50}
                className="select-none drag-none fixed"
            />
        </div>
        </div>
  )
}