import Navbar from "@/components/navbar/Navbar";
import { getSession } from '@auth0/nextjs-auth0';
import Dashboard from "../screens/dashboard/Dashboard";
import HomeContent from "../screens/home/Home"

export default async function Home() {
  const session = await getSession();

  if (session) return (
    <div className="h-screen">
      <Dashboard/>
    </div>
);

  return <HomeContent/>;
}
