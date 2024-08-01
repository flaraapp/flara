"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BsChevronDown } from "react-icons/bs";
import { motion } from 'framer-motion';

interface NavItemProps {
    name: string;
    href?: string;
    childrenItems?: Array<NavItemProps>;
    dropdown?: boolean;
}

export default function NavItem(item: NavItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const chevronVariants = {
        open: { rotate: 180 },
        closed: { rotate: 0 },
    };

    useEffect(() => {
        // Update the state based on window width
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
        };

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Function to toggle dropdown visibility
    const toggleDropdown = () => {
        if (isMobile) {
            setIsOpen(!isOpen);
        }
    };

    // Function to handle hover for non-mobile devices
    const handleHover = (state: boolean) => {
        if (!isMobile) {
            setIsOpen(state);
        }
    };

    if (!item.childrenItems) {
        return (
            <Link href={item.href!} className="hover:text-gray-500 transition duration-500">
                {item.name}
            </Link>
        );
    }

    return (
        <div className="relative"
             onMouseEnter={() => handleHover(true)}
             onMouseLeave={() => handleHover(false)}>
            <button
                onClick={toggleDropdown}
                className="flex items-center h-full rounded-md focus:outline-none hover:text-gray-500 transition duration-500"
            >
                {item.name}
                <motion.div
                    className="w-4 h-4 ml-2"
                    animate={isOpen ? "open" : "closed"}
                    variants={chevronVariants}
                    transition={{ duration: 0.2 }}
                >
                    <BsChevronDown size={15}/>
                </motion.div>
            </button>
            {(isOpen && (isMobile && !item.dropdown)) && (
                <div className="">
                    {item.childrenItems.map((child, index) => (
                        <Link href={child.href!} key={index}>
                            <div className="px-4 hover:text-gray-500 transition duration-500">
                                {child.name}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            {(isOpen && (!isMobile || item.dropdown)) && (
                <div className="absolute z-10 bg-white p-1 py-3 border border-gray-200 shadow-sm rounded-2xl">
                    {item.childrenItems.map((child, index) => (
                        <Link href={child.href!} key={index}>
                            <div className="block px-4 py-1 hover:text-gray-500 transition duration-500">
                                {child.name}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}