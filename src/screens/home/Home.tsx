import Navbar from "@/components/navbar/Navbar";

export default function HomeContent() {
  return (
    <main className="flex-row text-[#222222] z-0">
      <div className="flex w-full h-full justify-center">
        <Navbar></Navbar>
      </div>
      <div className="h-screen md:mx-10">
          <h1 className="font-serif text-4xl text-center font-medium px-3 pt-20"></h1>
      </div>
    </main>
  );
}