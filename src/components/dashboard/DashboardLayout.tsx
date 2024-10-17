import React, { memo, useState } from 'react';
import { BsList } from 'react-icons/bs';
import { motion } from 'framer-motion';
import Image from 'next/image';
import UserMenu from './UserMenu';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Button } from "@/components/ui/button"
import { IoGrid, IoGridOutline } from "react-icons/io5";
import { IoPeopleOutline, IoPeople } from "react-icons/io5";
import { IoMicOutline, IoMic } from "react-icons/io5";
import { LogOut, CreditCard, Settings, Users, Gauge, Mic, Plus } from 'lucide-react';
import Link from 'next/link';
import { PlaceholderValue, OnLoadingComplete } from 'next/dist/shared/lib/get-img-props';
import { usePageStore } from '@/screens/dashboard/Dashboard';
import { MenuButton } from '../button/MenuButton';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserProfile | undefined;
}

const MemoizedImage = memo(function MemoizedImage(props: React.JSX.IntrinsicAttributes & Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref" | "height" | "width" | "loading" | "alt" | "src" | "srcSet"> & { src: string | import("next/dist/shared/lib/get-img-props").StaticImport; alt: string; width?: number | `${number}` | undefined; height?: number | `${number}` | undefined; fill?: boolean | undefined; loader?: import("next/image").ImageLoader | undefined; quality?: number | `${number}` | undefined; priority?: boolean | undefined; loading?: "eager" | "lazy" | undefined; placeholder?: PlaceholderValue | undefined; blurDataURL?: string | undefined; unoptimized?: boolean | undefined; overrideSrc?: string | undefined; onLoadingComplete?: OnLoadingComplete | undefined; layout?: string | undefined; objectFit?: string | undefined; objectPosition?: string | undefined; lazyBoundary?: string | undefined; lazyRoot?: string | undefined; } & React.RefAttributes<HTMLImageElement | null>) {
    return <Image {...props} />;
  });

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const activePage = usePageStore((state: any) => state.page) as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (page: 'reports' | 'interview' | 'speech') => { 
    return page === activePage;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col w-full bg-neutral-100">
        {/* Topbar with Logo */}
        <div className="w-full bg-neutral-100 p-5 px-8 flex justify-between items-center">
          <Link href='/home'>
            <MemoizedImage
                src={require('../../../public/flara.svg')}
                alt="Flara"
                width={110}
                height={40}
                className="select-none drag-none"
                priority
            />
            </Link>
          <div className='flex gap-4 items-center justify-center h-10'>
             {/* future plus */}
             { user && 
            <UserMenu user={user} />
            }
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          {/* Sidebar */}
          <div className="w-28 bg-neutral-100 flex flex-col">
            <ul className="flex p-4 space-y-4 flex-col h-full">
              <Link href="/dashboard" className="flex justify-center">
                <Button variant="ghost" className={'h-16 min-w-26 hover:text-[#222222] transition duration-500 ' + (isActive("reports") ? 'text-[#222222] bg-neutral-200 hover:bg-neutral-200' : 'text-neutral-400')}>
                  <div className="">
                    <div className="flex justify-center mb-1">
                      <Gauge size={20}/>
                    </div>
                    <p className="text-center font-semibold text-xs">REPORTS</p>
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/speech"  className="flex justify-center w-26">
                <Button variant="ghost" className={'h-16 min-w-26 hover:text-[#222222] transition duration-500 ' + (isActive("speech") ? 'text-[#222222] bg-neutral-200 hover:bg-neutral-200' : 'text-neutral-400')}>
                  <div className="">
                    <div className="flex justify-center mb-1">
                      <Mic size={20}/>
                    </div>
                    <p className="text-center font-semibold text-xs">SPEECH</p>
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/interview" className="flex justify-center w-26">
                <Button variant="ghost" className={'h-16  w-26 hover:text-[#222222] transition duration-500 ' + (isActive("interview") ? 'text-[#222222] bg-neutral-200 hover:bg-neutral-200' : 'text-neutral-400')}>
                  <div className="">
                    <div className="flex justify-center mb-1">
                        <Users size={20}/>
                    </div>
                    <p className="text-center font-semibold text-xs">INTERVIEW</p>
                  </div>
                </Button>
              </Link>
              <div className='h-full flex-1 flex-grow left-0 w-full pb-6 space-y-4 relative'>
                <div className='absolute bottom-0 right-1/2 left-1/2 space-y-4'>
                <Link href="/settings" className="flex justify-center">
                    <Button variant="ghost" className={'h-16 text-neutral-400 hover:bg-neutral-200 transition duration-500'}>
                    <div className="">
                        <div className="flex justify-center mb-1">
                        <Settings size={20}/>
                        </div>
                        <p className="text-center font-semibold text-xs">SETTINGS</p>
                    </div>
                    </Button>
                </Link>
                <Link href="/billing" className="flex justify-center w-26">
                    <Button variant="ghost" className={'h-16 text-neutral-400 hover:bg-neutral-200 transition duration-500'}>
                    <div className="">
                        <div className="flex justify-center mb-1">
                        <CreditCard size={20}/>
                        </div>
                        <p className="text-center font-semibold text-xs">UPGRADE</p>
                    </div>
                    </Button>
                </Link>
                <Link href="/api/auth/logout" className="flex justify-center w-26">
                    <Button variant="ghost" className={'h-16 text-red-500 hover:bg-neutral-200 transition duration-500 hover:text-red-700'}>
                    <div className="">
                        <div className="flex justify-center mb-1">
                        <LogOut size={20}/>
                        </div>
                        <p className="text-center font-semibold text-xs">LOG OUT</p>
                    </div>
                    </Button>
                </Link>
                </div>
              </div>
            </ul>
          </div>

          {/* Scrollable Content Area with Rounded Edges */}
          <div className="flex-1 bg-white overflow-hidden rounded-tl-3xl">
            {/* The container with scrollable content */}
            <div className="overflow-x-auto overflow-y-auto h-full relative flex">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={"md:hidden flex flex-col h-screen w-full" + (isSidebarOpen ? " bg-neutral-100" : "")}>
        {/* Toggle Sidebar Button for Mobile */}
        <div className="p-4 flex justify-between items-center">
          <Image
            src={require('../../../public/flara.svg')}
            alt="Flara"
            width={100}
            height={60}
            className="select-none drag-none"
          />
          <MenuButton isOpen={isSidebarOpen}
                    strokeWidth="1.2"
                    height={9}
                    width={20}
                    lineProps={{ strokeLinecap: "round" }}
                    onClick={()=>setIsSidebarOpen(!isSidebarOpen)}></MenuButton>
        </div>

        {/* Sidebar and Content Stacked for Mobile */}
        <div onClick={()=>{(isSidebarOpen ? setIsSidebarOpen(false) : null)}}className={"flex-1 bg-white overflow-hidden transition duration-500 " + (isSidebarOpen ? 'brightness-90' : '')}>
          {/* The container with scrollable content */}
          <div className="overflow-x-scroll overflow-y-auto h-full relative flex">
            {children}
          </div>
        </div>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className="h-[calc(98%-4rem)] w-32 bg-neutral-100 absolute bottom-0 rounded-tr-2xl border-r border-t shadow-sm"
          >
            <ul className="flex p-4 space-y-4 flex-col w-32">
              <Link href="/dashboard" className="flex justify-center" onClick={()=>{(isSidebarOpen ? setIsSidebarOpen(false) : null)}}>
                <Button variant="ghost" className={'h-16 min-w-26 hover:text-[#222222] transition duration-500 ' + (isActive("reports") ? 'text-[#222222] bg-neutral-200 hover:bg-neutral-200' : 'text-neutral-400')}>
                  <div className="">
                    <div className="flex justify-center mb-1">
                      <Gauge size={20}/>
                    </div>
                    <p className="text-center font-semibold">REPORTS</p>
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/speech"  className="flex justify-center w-26" onClick={()=>{(isSidebarOpen ? setIsSidebarOpen(false) : null)}}>
                <Button variant="ghost" className={'h-16 min-w-26 hover:text-[#222222] transition duration-500 ' + (isActive("speech") ? 'text-[#222222] bg-neutral-200 hover:bg-neutral-200' : 'text-neutral-400')}>
                  <div className="">
                    <div className="flex justify-center mb-1">
                      <Mic size={20}/>
                    </div>
                    <p className="text-center font-semibold">SPEECH</p>
                  </div>
                </Button>
              </Link>
              <Link href="/dashboard/interview" className="flex justify-center w-26" onClick={()=>{(isSidebarOpen ? setIsSidebarOpen(false) : null)}}>
                <Button variant="ghost" className={'h-16  w-26 hover:text-[#222222] transition duration-500 ' + (isActive("interview") ? 'text-[#222222] bg-neutral-200 hover:bg-neutral-200' : 'text-neutral-400')}>
                  <div className="">
                    <div className="flex justify-center mb-1">
                        <Users size={20}/>
                    </div>
                    <p className="text-center font-semibold">INTERVIEW</p>
                  </div>
                </Button>
              </Link>
              <div className='bottom-0 absolute pb-6 space-y-4'>
                <Link href="/settings" className="flex justify-center" onClick={()=>{(isSidebarOpen ? setIsSidebarOpen(false) : null)}}>
                    <Button variant="ghost" className={'h-16 text-neutral-400 hover:bg-neutral-200 transition duration-500'}>
                    <div className="">
                        <div className="flex justify-center mb-1">
                        <Settings size={20}/>
                        </div>
                        <p className="text-center font-semibold">SETTINGS</p>
                    </div>
                    </Button>
                </Link>
                <Link href="/billing" className="flex justify-center w-26" onClick={()=>{(isSidebarOpen ? setIsSidebarOpen(false) : null)}}>
                    <Button variant="ghost" className={'h-16 text-neutral-400 hover:bg-neutral-200 transition duration-500'}>
                    <div className="">
                        <div className="flex justify-center mb-1">
                        <CreditCard size={20}/>
                        </div>
                        <p className="text-center font-semibold">UPGRADE</p>
                    </div>
                    </Button>
                </Link>
                <Link href="/api/auth/logout" className="flex justify-center w-26" onClick={()=>{(isSidebarOpen ? setIsSidebarOpen(false) : null)}}>
                    <Button variant="ghost" className={'h-16 text-red-500 hover:bg-neutral-200 transition duration-500 hover:text-red-700'}>
                    <div className="">
                        <div className="flex justify-center mb-1">
                        <LogOut size={20}/>
                        </div>
                        <p className="text-center font-semibold">LOG OUT</p>
                    </div>
                    </Button>
                </Link>
              </div>
            </ul>
          </motion.div>
        )}

        {/* Main Content for Mobile (allow horizontal scroll here as well) */}
      </div>
    </div>
  );
}
