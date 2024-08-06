'use client';
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function About() {
  return (
    <main className="flex-row text-[#333333] z-0 ">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="max-w-screen mt-32">
        <div className="mt-10 pb-20 md:pb-32">
              <div className="text-center flex justify-center">
                <div className="border py-1 px-4 rounded-full text-xl text-gray-500">ABOUT FLARA</div>
              </div>
              <div className="text-center text-3xl md:text-5xl mt-5 mx-5">Providing accessible guidance and assistance for all.</div>
              <div className="text-center text-xl md:text-3xl mt-2 mx-5 font-light">AI prep tools for good, for free.</div>
              <div className="md:flex md:mx-16 mx-5 items-center justify-center gap-8 mt-16">
                <div className="h-60 min-w-80 flex-col grow border rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 bg-[#33333308] rounded-br-3xl">UTILS</div>
                  <div className="h-40 min-w-80 flex-col grow border rounded-3xl"></div>
                </div>
                <div className="h-60 min-w-80 flex-col grow border rounded-3xl"></div>
                <div className="h-60 min-w-80 flex-col grow border rounded-3xl"></div>
              </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}