import Navbar from "@/components/navbar/Navbar";
import Image from 'next/image'
export default function HomeContent() {
  return (
    <main className="flex-row text-[#222222] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="h-screen max-w-screen">
          <h1 className="text-6xl md:text-7xl font-medium pt-20 mx-10 mb-16 md:mb-0">
            Speech and Interview Prep, made <p className="w-min border-[#B2F260] border-b-8">Simple</p>
          </h1>
          <div className="max-w-screen overflow-x-clip absolute z-2">
            <Image
              className="w-screen scale-[2.7] md:scale-[1.4] object-cover overflow-clip -translate-x-30 sticky"
              layout="contain"  // or 'fill', 'contain', 'cover'
              src='/Vectorflaraa.svg'
              alt='Flara'
              width={'100'}
              height={'100'}
            />
          </div>
          <div className="max-w-screen overflow-x-clip opacity-30 md:translate-y-[10vh] translate-y-[4vh] z-1">
            <Image
              className="w-screen scale-[2.7] md:scale-[1.4] object-cover overflow-clip -translate-x-30 sticky"
              layout="contain"  // or 'fill', 'contain', 'cover'
              src='/Vectorflaraa.svg'
              alt='Flara'
              width={'100'}
              height={'100'}
            />
          </div>
          <p className='pt-[100vh]'>flara</p>
      </div>
    </main>
  );
}