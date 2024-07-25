import Navbar from "@/components/navbar/Navbar";

export default function HomeContent() {
  return (
    <main className="flex-row text-[#222222] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="h-screen md:mx-10">
          <h1 className="text-7xl font-medium pt-20 mx-10 ">
            Speech and Interview Prep, made <p className="w-min border-[#B2F260] border-b-8">Accessible</p>
            </h1>
      </div>
    </main>
  );
}