import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDocumentReport, HiOutlineMicrophone, HiOutlineUserGroup } from 'react-icons/hi';
import { MenuButton } from '../button/MenuButton';

export default function MenuBar() {
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
            className="absolute top-0 left-0 mt-4 ml-4 border p-3 rounded-full shadow-md sm:rounded-full sm:w-auto sm:flex sm:items-center z-20 bg-white"
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
                    height={12}
                    width={15}
                    lineProps={{ strokeLinecap: "round" }}
                    className={""}
                />
                {isHovered && <span className="ml-5">Close</span>}
            </div>
            <div className="hidden sm:flex items-center space-x-4 mt-0">
                <a href="/reports" className="flex items-center transition duration-500 hover:bg-gray-100 rounded-full p-2">
                    <HiOutlineDocumentReport className="inline-block mr-2" />
                    Reports
                </a>
                <a href="/speech" className="flex items-center transition duration-500 hover:bg-gray-100 rounded-full p-2">
                    <HiOutlineMicrophone className="inline-block mr-2" />
                    Speech
                </a>
                <a href="/interview" className="flex items-center transition duration-500 hover:bg-gray-100 rounded-full p-2">
                    <HiOutlineUserGroup className="inline-block mr-2" />
                    Interview
                </a>
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
                        <a href="/reports" className="p-2 flex items-center transition duration-500 hover:bg-gray-100 rounded-full">
                            <HiOutlineDocumentReport className="inline-block mr-2" />
                            Reports
                        </a>
                        <a href="/speech" className="p-2 flex items-center transition duration-500 hover:bg-gray-100 rounded-full">
                            <HiOutlineMicrophone className="inline-block mr-2" />
                            Speech
                        </a>
                        <a href="/interview" className="p-2 flex items-center transition duration-500 hover:bg-gray-100 rounded-full">
                            <HiOutlineUserGroup className="inline-block mr-2" />
                            Interview
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
