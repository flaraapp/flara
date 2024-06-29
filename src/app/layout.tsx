import type { Metadata } from "next";
import { Karla, Noto_Serif_Display } from "next/font/google";
import "./globals.css";

const hanken = Karla({
  subsets: ["latin"],
  variable: '--font-hanken',
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
    <html lang="en">
      <body className={`${hanken.variable} ${frank.variable} font-sans`}>{children}</body>
    </html>
  );
}
