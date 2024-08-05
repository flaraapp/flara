'use client';
import Navbar from "@/components/navbar/Navbar";
import { motion } from "framer-motion";
import Image from 'next/image'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Footer from "@/components/footer/Footer";

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
            <div className="w-full flex md:justify-end pt-20 pr-20 ">
              <div className="text-2xl font-light w-[16rem] ml-1 md:ml-0">
                <p>Accessible growth with Flara, powered by AI</p>
                <AnimatedLink/>
              </div>
            </div>
          </div>
          <div className="mt-10 pb-20 md:pb-32">
            <div className="text-center flex justify-center">
              <div className="border py-1 px-4 rounded-full text-xl text-gray-500">FEATURES & TOOLS</div>
            </div>
            <div className="text-center text-3xl md:text-5xl mt-7 mx-5">Practice speaking and gain valuable feedback.</div>
            <div className="grid md:grid-cols-2 mx-5 md:mx-[5%] gap-8 md:gap-0 mt-16">
              <div className="flex justify-center items-center">
                <Link href='#speech'>
                <Image
                  className="rounded-3xl border hover:scale-105 transition duration-500 drag-none"
                  src={'/speech.png'}
                  alt="speech"
                  width={500}
                  height={500}
                />
                </Link>
              </div>
              <div className="flex justify-center items-center">
                <Link href='#interview'>
                <Image
                  className="rounded-3xl border hover:scale-105 transition duration-500 drag-none"
                  src={'/interview.png'}
                  alt="interview"
                  width={500}
                  height={500}
                />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-[#33333308] w-screen px-5 md:px-16 pb-8 md:pb-20" id="speech">
            <div className="text-center flex pt-8 md:pt-20">
              <div className="border py-1 px-4 rounded-full text-xl text-gray-500 bg-white">SPEECH PRACTICE</div>
            </div>
            <div className="text-3xl md:text-5xl mt-4">Gain confidence and clarity</div>
            <div className="mt-4 md:text-2xl text-lg font-light">Flara helps you prepare for talks and speeches by providing constructive feedback.</div>
            <div className=" text-lg md:text-2xl font-light">Use accurate transcriptions to identify points of improvement.</div>
            <div className="mt-10 grid md:grid-cols-2 md:gap-0 gap-8">
              <div className="flex items-center justify-center md:justify-end md:order-2">
                <Image
                      className="rounded-3xl transition duration-500 drag-none flex justify-center"
                      src={'/speech_real.png'}
                      alt="Speech Preview"
                      width={500}
                      height={700}
                    />
              </div>
              <div className="md:text-xl font-light h-full md:mt-20 ">
                <div className="border-b py-4">
                  Identify use of stutter words and their frequency within the speech to increase clarity and improve delivery.
                </div>
                <div className="border-b py-4 ">
                  Recieve a score of developing, or competent, or outstanding to quantify your progress and growth with each practice.
                </div>
                <div className="py-4">
                  View an accurate transcription of your speech with timestamps along with your personalized feedback and critique.
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#33333308] w-screen px-5 md:px-16 pb-16 md:pb-32" id="interview">
            <div className="text-center flex pt-8 md:pt-20">
              <div className="border py-1 px-4 rounded-full text-xl text-gray-500 bg-white">INTERVIEW PREP</div>
            </div>
            <div className="text-3xl md:text-5xl mt-4">Practice realistic interview questions</div>
            <div className="mt-4 md:text-2xl text-lg font-light">A personalized interview coach for a specific job or position.</div>
            <div className=" text-lg md:text-2xl font-light">Answer a variety of realistic questions verbally.</div>
            <div className="mt-10 grid md:grid-cols-2 md:gap-0 gap-8">
              <div className="flex justify-center md:justify-start">
                <Image
                      className="rounded-3xl transition duration-500 drag-none flex justify-center"
                      src={'/interview_real.png'}
                      alt="Interview Preview"
                      width={500}
                      height={700}
                    />
              </div>
              <div className="md:text-xl font-light h-full md:mt-20 ">
                <div className="border-b py-4">
                  Record your response per question, move at your own pace while maintaining consistency an active interview environment.
                </div>
                <div className="border-b py-4 ">
                  Interview trials are based on the job or position context you provide, ensuring a realistic and personalized experience.
                </div>
                <div className="py-4">
                  Responses are transcribed and saved for future reference, allowing you to track your progress and growth over time.
                </div>
              </div>
            </div>
          </div>
          <div className="w-screen py-8 md:py-20 pb-20 md:pb-32">
          <div className="text-center flex justify-center">
              <div className="border py-1 px-4 rounded-full text-xl text-gray-500">EASY TO USE</div>
            </div>
            <div className="text-center text-3xl md:text-5xl mt-7 mx-5">Get started in just a few easy steps.</div>
            <div className="text-center text-xl md:text-3xl mt-2 mx-5 font-light">Recieve and view feedback within minutes.</div>
            <div className="grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 grid-rows-6 mx-5 md:mx-16 mt-16 md:gap-10 gap-6 font-light">
              <div className="flex text-lg">
                <div className="text-gray-500 font-light rounded-full border min-w-16 max-h-16 flex items-center justify-center text-xl mr-5">01</div>
                <div>Create an account or login to Flara using sign-in providers.</div>
              </div>
              <div className="flex text-lg">
                <div className="text-gray-500 font-light rounded-full border min-w-16 h-16 flex items-center justify-center text-xl mr-5">02</div>
                <div>Allow Flara permission to your device&apos;s microphone when prompted.</div>
              </div>
              <div className="flex text-lg">
                <div className="text-gray-500 font-light rounded-full border min-w-16 h-16 flex items-center justify-center text-xl mr-5">03</div>
                <div>Record a speech in the Speech Tab and provide context.</div>
              </div>
              <div className="flex text-lg">
                <div className="text-gray-500 font-light rounded-full border min-w-16 h-16 flex items-center justify-center text-xl mr-5">04</div>
                <div>Practice an interview in the Interview Tab by providing a job description.</div>
              </div>
              <div className="flex text-lg">
                <div className="text-gray-500 font-light rounded-full border min-w-16 h-16 flex items-center justify-center text-xl mr-5">05</div>
                <div>Record your response for each interview question to be graded.</div>
              </div>
              <div className="flex text-lg">
                <div className="text-gray-500 font-light rounded-full border min-w-16 h-16 flex items-center justify-center text-xl mr-5">06</div>
                <div>Flara will process your responses and you can view the reports in Reports.</div>
              </div>
            </div>
          </div>
          <div className="w-screen bg-[#222222] text-neutral-100 md:pb-32 pb-16">
            <div className="text-center flex justify-center pt-8 md:pt-20">
              <div className="border border-[#434442] py-1 px-4 rounded-full text-xl text-neutral-100 bg-[#333431]">PRICING</div>
            </div>
            <div className="text-center text-3xl md:text-5xl mt-7 mx-5">Free to start, with generous limits.</div>
            <div className="text-center text-xl md:text-3xl mt-2 mx-5 font-light">And even more for non-profit organizations.</div>
            <div className="flex items-center justify-center">
              <div className="md:flex items-center justify-center gap-10 pt-10">
                <div className="flex border-[#434442] border rounded-3xl h-16 w-[20rem] overflow-hidden mb-8 md:mb-0">
                  <div className="bg-[#333431]  min-w-32 flex justify-center items-center text-2xl">100
                    <span className="text-sm text-gray-400 pt-1.5 ml-0.5">credits</span>
                  </div>
                  <div className="flex items-center justify-center w-full">Speech Trial</div>
                </div>
                <div className="flex border-[#434442] border rounded-3xl h-16 w-[20rem] overflow-hidden">
                  <div className="bg-[#333431] min-w-32 flex justify-center items-center text-2xl">300
                    <span className="text-sm text-gray-400 pt-1.5 ml-0.5">credits</span>
                  </div>
                  <div className="flex items-center justify-center w-full">Interview Practice</div>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-3 md:mx-16 mx-5 gap-8 md:gap-16 mt-16">
              <div className="h-[500px] border border-[#434442] rounded-3xl overflow-hidden relative">
                <div className="bg-[#333431] px-4 py-3">
                  <div className="text-3xl">Starter</div>
                  <div className="text-xl text-gray-400 font-light">Get started for free.</div>
                </div>
                <div>
                  <div className="mt-12">
                    <div className="text-5xl text-center">$0</div>
                    <div className="text-center text-gray-400 text-xl mt-2">600 credits daily</div>
                    <div className="text-center mx-8 mt-10 font-light">Daily allowance of 600 credits.</div>
                    <div className="text-center mx-8 mt-4 font-light">Resets every 24 hours.</div>
                    <div className="text-center mx-8 mt-4 font-light">Multiple speeches and interviews daily.</div>
                  </div>
                </div>
                <div className="absolute bottom-0 mb-5 flex w-full px-5">
                  <div className="min-w-full bg-[#333431] h-12 rounded-xl flex items-center justify-center text-xl hover:scale-105 transition duration-500 cursor-pointer">Get Started</div>
                </div>
              </div>
              <div className="h-[500px] border border-[#434442] rounded-3xl overflow-hidden relative">
                <div className="bg-[#333431] px-4 py-3">
                  <div className="text-3xl">Plus</div>
                  <div className="text-xl text-gray-400 font-light">Purchase more credits.</div>
                </div>
                <div>
                  <div className="mt-12">
                    <div className="text-5xl text-center">$0.05</div>
                    <div className="text-center text-gray-400 text-xl mt-2">per credit</div>
                    <div className="text-center mx-8 mt-10 font-light">In addition to the daily 600 credits.</div>
                    <div className="text-center mx-8 mt-4 font-light">Always valid for interviews or speeches.</div>
                    <div className="text-center mx-8 mt-4 font-light">Also available in credit bundles.</div>
                  </div>
                </div>
                <div className="absolute bottom-0 mb-5 flex w-full px-5">
                  <div className="min-w-full bg-[#333431] h-12 rounded-xl flex items-center justify-center text-xl hover:scale-105 transition duration-500 cursor-pointer">Purchase</div>
                </div>
              </div>
              <div className="h-[500px] border border-[#434442] rounded-3xl overflow-hidden relative">
                <div className="bg-[#333431] px-4 py-3">
                  <div className="text-3xl">Organization</div>
                  <div className="text-xl text-gray-400 font-light">For non-profits and organizations.</div>
                </div>
                <div>
                  <div className="mt-12">
                    <div className="text-5xl text-center">$0-100</div>
                    <div className="text-center text-gray-400 text-xl mt-2">1.2-5k credits daily</div>
                    <div className="text-center mx-8 mt-10 font-light">Customizable daily allowance.</div>
                    <div className="text-center mx-8 mt-4 font-light">Basic organization plan free for NPO&apos;s.</div>
                    <div className="text-center mx-8 mt-4 font-light">Multiple speeches and interviews daily.</div>
                  </div>
                </div>
                <div className="absolute bottom-0 mb-5 flex w-full px-5">
                  <div className="min-w-full bg-[#333431] h-12 rounded-xl flex items-center justify-center text-xl hover:scale-105 transition duration-500 cursor-pointer">Contact</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <Footer />
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
        Get started for free<FiArrowUpRight className="animate animate-pulse" />
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