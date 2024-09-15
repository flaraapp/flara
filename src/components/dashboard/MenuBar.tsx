import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDocumentReport, HiOutlineMicrophone, HiOutlineUserGroup } from 'react-icons/hi';
import { MenuButton } from '../button/MenuButton';
import Link from 'next/link';

interface MenuBarProps {
    activePage: 'reports' | 'speech' | 'interview';
}

export default function MenuBar({ activePage }: MenuBarProps) {
    const [isHovered, setIsHovered] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsHovered(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <motion.div
            ref={menuRef}
            className="absolute top-0 left-0 mt-4 ml-4 border p-3 md:p-2 rounded-full sm:rounded-full sm:w-auto sm:flex sm:items-center z-20 bg-white"
            layout
            initial={{ borderRadius: 50 }}
            animate={{ borderRadius: isHovered ? 30 : 50 }}
            transition={{ type: "tween", duration: 0.1 }}
        >
            <div className="cursor-pointer sm:hidden flex items-center p-[0.6rem]" onClick={() => setIsHovered(!isHovered)}>
                <MenuButton
                    isOpen={isHovered}
                    onClick={() => { }}
                    strokeWidth="1.7"
                    height={9}
                    width={15}
                    lineProps={{ strokeLinecap: "round" }}
                    className={""}
                />
                {isHovered && <span className="ml-5">Close</span>}
            </div>
            <div className="hidden sm:flex items-center space-x-4 mt-0">
                <Link href="/dashboard" className={`flex items-center transition duration-500 rounded-full p-2 ${activePage === 'reports' ? 'text-[#22222290]' : 'hover:bg-gray-100'}`}>
                    <HiOutlineDocumentReport className="inline-block mr-2" />
                    Reports
                </Link>
                <Link href="/dashboard/speech" className={`flex items-center transition duration-500 rounded-full p-2 ${activePage === 'speech' ? 'text-[#22222290]' : 'hover:bg-gray-100'}`}>
                    <HiOutlineMicrophone className="inline-block mr-2" />
                    Speech
                </Link>
                <Link href="/dashboard/interview" className={`flex items-center transition duration-500 rounded-full p-2 ${activePage === 'interview' ? 'text-[#22222290]' : 'hover:bg-gray-100'}`}>
                    <HiOutlineUserGroup className="inline-block mr-2" />
                    Interview
                </Link>
            </div>
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="flex flex-col mt-2 sm:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "tween", duration: 0.1 }}
                        layout
                    >
                        <Link href="/dashboard" className={`p-2 flex items-center transition duration-500 rounded-full ${activePage === 'reports' ? 'text-gray-500' : 'hover:bg-gray-100'}`}>
                            <HiOutlineDocumentReport className="inline-block mr-2" />
                            Reports
                        </Link>
                        <Link href="/dashboard/speech" className={`p-2 flex items-center transition duration-500 rounded-full ${activePage === 'speech' ? 'text-gray-500' : 'hover:bg-gray-100'}`}>
                            <HiOutlineMicrophone className="inline-block mr-2" />
                            Speech
                        </Link>
                        <Link href="/dashboard/interview" className={`p-2 flex items-center transition duration-500 rounded-full ${activePage === 'interview' ? 'text-gray-500' : 'hover:bg-gray-100'}`}>
                            <HiOutlineUserGroup className="inline-block mr-2" />
                            Interview
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
