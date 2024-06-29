import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex-row text-[#222222] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="h-screen md:mx-10">
          <h1 className="font-serif text-4xl text-center font-medium px-3 pt-20">Speech and interview prep made easy with Flara</h1>
      </div>
    </main>
  );
}
