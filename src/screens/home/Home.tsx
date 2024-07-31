import Navbar from "@/components/navbar/Navbar";
import Image from 'next/image'
export default function HomeContent() {
  return (
    <main className="flex-row text-[#222222] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="h-screen max-w-screen">
          <div className="mx-10 md:mx-20 z-2 pt-10">
            <Image
              className="h-[70vh] overflow-y-hidden w-screen object-cover rounded-2xl"
              src='/gradient.svg'
              width={1920}
              height={200}
              alt="gradient"
            />
          </div>
          <div className="-translate-y-[120%] mx-20 md:mx-32 ">
            <Image
                className="mb-5 ml-1"
                src='/leaf.svg'
                width={100}
                height={100}
                alt="gradient"
              />
            <h1 className="text-6xl md:text-7xl font-light mb-16 md:mb-0 ">
              Speech and Interview Prep, made <strong>Simple</strong>
            </h1>
          </div>
          <p className='pt-[100vh]'>flara</p>
      </div>
    </main>
  );
}