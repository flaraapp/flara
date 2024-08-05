
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <div>
            <footer className="bg-white p-4 text-center h-80 md:h-60 relative">
                <div className="grid md:grid-cols-2 mx-5 mt-5">
                    <div>
                        <Image src="/flara.svg" alt="Flara" width={135} height={50} />
                    </div>
                    <div className="text-left mt-10 text-2xl md:mt-0">
                        <Link href="/about">
                            <p className="mx-2">About</p>
                        </Link>
                        <Link href="/contact">
                            <p className="mx-2">Contact</p>
                        </Link>
                        <Link href="/privacy">
                            <p className="mx-2">Privacy</p>
                        </Link>
                        <Link href="/terms">
                            <p className="mx-2">Terms</p>
                        </Link>
                    </div>
                </div>
                <p className="left-0 bottom-0 text-left absolute p-3 bg-[#33333308] w-screen">© 2024 Flara. All rights reserved.</p>
            </footer>
        </div>
    );
}
