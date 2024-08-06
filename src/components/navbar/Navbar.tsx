"use client";

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import Button from "../button/Button";
import NavItem from "./NavItem";
import { useEffect, useState } from "react";
import NavMobile from "./NavMobile";
import { MenuButton } from "../button/MenuButton";
import Link from 'next/link';
export default function Navbar() {
    const [isOpen, setOpen] = useState(false);
    const { user, error, isLoading } = useUser();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    return (
        <div className={"w-full flex justify-center fixed top-0 z-10 " + (isOpen ? "bg-white" : "bg-opacity-50 backdrop-blur-lg transition duration-500 ") + (isScrolled ? " bg-white shadow-sm" : "")}>
            <nav className="flex justify-between w-full max-w-[1280px] h-20 items-center">
                <div className="flex w-full px-5 justify-between items-center max-w-[1280px]">
                    <div className="select-none drag-none">
                        <Link href='/'>
                        <Image
                            src={"flara.svg"}
                            alt={"Flara"}
                            width={135}
                            height={50}
                            className="select-none drag-none"
                        />
                        </Link>
                    </div>
                    <div className={"font-semibold gap-8 hidden md:flex md:ml-8" + ((user) ? " md:ml-20": "")}>
                        <NavItem name='Product' href="/product" childrenItems={[{name:"Features", href: "/features"}, {name:"Support", href: "/support"}]}/>
                        <NavItem name='Company' href="/Company" childrenItems={[{name:"About", href: "/about"}]}/>
                        <NavItem name='Blog' href="/blog"/>
                    </div>
                    <div className="gap-2 hidden md:flex">
                        <Button text="Contact" type="secondary" href="/contact"></Button>
                        {  (user) ?
                        <Button text="Dashboard" type="primary" href="/"></Button> :
                        <Button text="Login" type="primary" href="/api/auth/login"></Button>
                    }
                    </div>
                    <div className="md:hidden items-center flex">
                        <MenuButton
                            isOpen={isOpen}
                            onClick={() => setOpen(!isOpen)}
                            strokeWidth="2"
                            height={10}
                            width={24}
                            lineProps={{ strokeLinecap: "round" }}
                        />
                    </div>
                </div>
            </nav>
        <NavMobile isOpen={isOpen} toggleNav={setOpen}/>
        </div>
    );
}