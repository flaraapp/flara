import type { Metadata } from "next";
import { Karla, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const hanken = Karla({
  subsets: ["latin"],
  variable: '--font-hanken',
  display: 'swap'
});
const frank = Frank_Ruhl_Libre({
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
