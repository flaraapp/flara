import { UserProfile } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLogout, HiOutlineHome, HiOutlineAdjustments } from "react-icons/hi";
import { BsChevronDown } from 'react-icons/bs';

interface UserMenuProps {
    user: UserProfile;
}

export default function UserMenu({ user }: UserMenuProps) {
    const [isHovered, setIsHovered] = useState(false);
    const chevronVariants = {
        open: { rotate: 180 },
        closed: { rotate: 0 },
    };
    return (
        <motion.div
            className="absolute top-0 right-0 mt-4 mr-4 border p-3 rounded-full shadow-md"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            layout
            initial={{ borderRadius: 50 }}
            animate={{ borderRadius: isHovered ? 30 : 50 }}
            transition={{ type: "tween", duration: 0 }}
        >
            <div className="flex items-center cursor-pointer w-[10rem]">
                <Image
                    src={user.picture || "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"}
                    alt={user.name as string}
                    className="border w-8 h-8 rounded-full mr-2"
                    width={50}
                    height={50}
                />
                <span className='w-full'>
                    {
                        (() => {
                        let displayName = user.nickname || user.name || user.email?.split("@")[0] || 'User';
                        if (displayName.includes(' ')) {
                            displayName = displayName.split(' ')[0];
                        }
                        if (displayName.length > 12) { // Step 3
                            displayName = `${displayName.substring(0, 9)}...`;
                        }
                        return displayName;
                        })()
                    }
                </span>
                <motion.div
                    className="w-4 h-4 mr-1"
                    animate={isHovered ? "open" : "closed"}
                    variants={chevronVariants}
                    transition={{ duration: 0.2 }}
                >
                    <BsChevronDown size={15}/>
                </motion.div>
            </div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="flex flex-col"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "tween", duration:0.1 }}
                        layout
                    >
                        <a href="/home" className="p-2 mt-2 flex items-center transition duration-500 hover:bg-gray-100 rounded-full">
                            <HiOutlineHome className="inline-block mr-4" />
                            Home
                        </a>
                        <a href="/settings" className="p-2 flex items-center transition duration-500 hover:bg-gray-100 rounded-full">
                            <HiOutlineAdjustments className="inline-block mr-4" />
                            Settings
                        </a>
                        <a href="/api/auth/logout" className="p-2  flex items-center text-red-500 hover:text-red-700 transition duration-500 hover:bg-red-100 rounded-full">
                            <HiOutlineLogout className="inline-block mr-[0.9rem] ml-[0.1rem]" />
                            Sign out
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
