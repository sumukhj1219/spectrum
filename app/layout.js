// RootLayout.js (Your layout component)
'use client'
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SessionProvider } from "next-auth/react";
import { useState } from "react"; // Import useState to manage the background color state

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  const [bgColor, setBgColor] = useState('bg-neutral-700'); 
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-7xl items-center justify-center mx-auto`}
          style={{ backgroundColor: bgColor, transition: 'background-color 0.3s ease'}} 
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
