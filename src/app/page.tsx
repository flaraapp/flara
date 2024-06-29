import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-row text-[#222222] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="rounded-2xl h-screen md:mx-10 bg-gradient-to-b from-lime-200 to-orange-300 opacity-100">

      </div>
    </main>
  );
}
