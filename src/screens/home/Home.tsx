'use client';
import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";


export default function HomeContent() {
  const [viewHeight, setViewHeight] = useState(0);

  useEffect(() => {
    // Update the view height state with the current window inner height
    setViewHeight(window.innerHeight);

    // Optionally, add an event listener to update the height on resize
    const handleResize = () => {
      if (window.innerHeight - viewHeight > 50 || window.innerHeight - viewHeight < -50)
        setViewHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <main className="flex-row text-[#333333] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="max-w-screen">
          <div className={`h-[110svh] w-screen opacity-50 absolute z-[-1]`} style={{
                backgroundImage: "radial-gradient(at 84.9% 25.3%, #B2F260 0px, transparent 50%),radial-gradient(at 15.1% 57.5%, #4FE4C4 0px, transparent 50%),radial-gradient(at 65.4% 55.7%, #FC8C3C 0px, transparent 50%)",
            }}>
          </div>
          <div className={`mx-10 md:mx-32 md:pt-48 h-[100svh] pt-[16svh]`}>
            <Image
                className="mb-7 ml-1"
                src='/leaf.svg'
                width={100}
                height={100}
                alt="gradient"
              />
            <h1 className="text-5xl md:text-7xl font-light ">
              Speech and Interview Prep, made <strong>Simple</strong>
            </h1>
            <div className="w-full flex justify-end pt-20 pr-20 ">
              <div className="text-2xl font-light w-[16rem] ml-1 md:ml-0">
                <p>Accessible growth with Flara, powered by AI</p>
                <AnimatedLink/>
              </div>
            </div>
          </div>
          <div className="mt-10 pb-40">
            <div className="text-center flex justify-center">
              <div className="border py-1 px-4 rounded-full text-xl text-gray-500">FEATURES & TOOLS</div>
            </div>
            <div className="text-center text-3xl md:text-5xl mt-7 mx-5">Practice speaking and gain valuable feedback.</div>
            <div className="grid md:grid-cols-2 mx-12 md:mx-[5%] gap-8 mt-16">
              <div className="flex justify-center items-center">
                <Image
                  className="rounded-3xl border hover:scale-105 transition duration-500"
                  src={'speech.svg'}
                  alt="speech"
                  width={450}
                  unoptimized={true}
                  height={450}
                />
              </div>
              <div className="flex justify-center items-center">
                <Image
                  className="rounded-3xl border hover:scale-105 transition duration-500"
                  src={'interview.svg'}
                  alt="interview"
                  unoptimized={true}
                  width={450}
                  height={450}
                />
              </div>
            </div>
          </div>
      </div>
    </main>
  );
}

const AnimatedLink = () => {
  return (
    <motion.div
      className="inline-block"
      whileHover="hover"
      initial="initial"
      animate="initial"
    >
      <Link href="/api/auth/login" className="text-lg flex gap-2 items-center mt-6 transition duration-500">
        Get Started <FiArrowUpRight className="animate animate-pulse" />
      </Link>
      <motion.div
        className="h-0.5 bg-[#333333] mt-1"
        variants={{
          initial: { width: 0 },
          hover: { width: '100%' }
        }}
        transition={{ duration: 0.3, type: 'tween' }}
      />
    </motion.div>
  );
};