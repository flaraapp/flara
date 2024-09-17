'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Button from "../button/Button";
import NavItem from "./NavItem";
import { Dispatch, SetStateAction, useEffect } from "react";

interface NavMobileProps {
    isOpen: boolean;
    toggleNav: Dispatch<SetStateAction<boolean>>;
}
export default function NavMobile(props: NavMobileProps) {
    const { user, error, isLoading } = useUser();
    useEffect(() => {
        if (props.isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
    }, [props.isOpen]);
    if (!props.isOpen) return;

    return (
        <nav className="absolute h-[100vh] items-center bg-white z-10 w-screen mt-20">
            <div className="w-full px-5 items-center z-10">
                <div className="flex-1 h-[60vh] text-3xl font-light">
                    <div className="py-1"></div>
                    <NavItem name='Product' href="/product" childrenItems={[{name:"Features", href: "#features"}, {name:"Support", href: "mailto:contact@flara.app"}]}/>
                    <div className="py-1"></div>
                    <NavItem name='Company' href="/Company" childrenItems={[{name:"About", href: "#about"}]}/>
                    <div className="py-1"></div>
                    <NavItem name='Pricing' href="#pricing"/>
                </div>
                <div className="gap-2 grid grid-rows-2">
                    <Button text="Contact" type="secondary" href="mailto:contact@flara.app"></Button>
                    {  (user) ?
                        <Button text="Dashboard" type="primary" href="/"></Button> :
                        <Button text="Login" type="primary" href="/api/auth/login"></Button>
                    }
                </div>
            </div>
        </nav>
    );
}