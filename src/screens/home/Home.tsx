import Navbar from "@/components/navbar/Navbar";
import Image from 'next/image'
export default function HomeContent() {
  return (
    <main className="flex-row text-[#222222] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="h-screen max-w-screen">
      <div className="h-[120vh] w-screen opacity-50 absolute z-[-1]" style={{
            backgroundImage: "radial-gradient(at 84.9% 19.3%, #FC8C3C 0px, transparent 50%),radial-gradient(at 15.1% 54.5%, #4FE4C4 0px, transparent 50%),radial-gradient(at 75.4% 58.7%, #B2F260 0px, transparent 50%)",
        }}>
          </div>
          <div className="mx-20 md:mx-32 pt-40">
            <Image
                className="mb-5 ml-1"
                src='/leaf.svg'
                width={100}
                height={100}
                alt="gradient"
              />
            <h1 className="text-5xl md:text-7xl font-light mb-16 md:mb-0 ">
              Speech and Interview Prep, made <strong>Simple</strong>
            </h1>
          </div>
          <p className='pt-[100vh]'>flara</p>
      </div>
    </main>
  );
}