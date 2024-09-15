import { getSession } from '@auth0/nextjs-auth0';
import Dashboard from "../screens/dashboard/Dashboard";
import HomeContent from "../screens/home/Home"
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session) return redirect('/dashboard');

  return <HomeContent/>;
}
