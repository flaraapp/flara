import type { Metadata } from "next";
import { Karla, Noto_Serif_Display } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "./globals.css";

const karla = Karla({
  subsets: ["latin"],
  variable: '--font-karla',
  display: 'swap'
});
const frank = Noto_Serif_Display({
  subsets: ["latin"],
  variable: '--font-frank',
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Flara",
  description: "Speech & interview prep made simple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <UserProvider>
        <body className={`${karla.variable} ${frank.variable} font-sans text-[#333333]`}>{children}</body>
      </UserProvider>
    </html>
  );
}
