import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function BottomBar() {
    return (
        <div className="fixed bottom-0 inset-x-0 border w-20 flex items-center p-2.5 rounded-t-3xl shadow-lg">
          <Link href="/reports" className="hover:text-gray-300">Reports</Link>
          <Link href="/interview" className="hover:text-gray-300">Interview</Link>
          <Link href="/speech" className="hover:text-gray-300">Speech</Link>
        </div>
    );
}