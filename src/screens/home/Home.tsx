'use client';
import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import Image from 'next/image'
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";


export default function HomeContent() {
  return (
    <main className="flex-row text-[#333333] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="h-screen max-w-screen">
      <div className="h-[120vh] w-screen opacity-50 absolute z-[-1]" style={{
            backgroundImage: "radial-gradient(at 84.9% 25.3%, #B2F260 0px, transparent 50%),radial-gradient(at 15.1% 57.5%, #4FE4C4 0px, transparent 50%),radial-gradient(at 65.4% 59.7%, #FC8C3C 0px, transparent 50%)",
        }}>
          </div>
          <div className="mx-20 md:mx-32 md:pt-48 pt-[15vh]">
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
              <div className="text-2xl font-light w-[16rem]">
                <p>Accessible growth with Flara, powered by AI.</p>
                <AnimatedLink/>
              </div>
            </div>
          </div>
          <p className='pt-[100vh]'>flara</p>
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