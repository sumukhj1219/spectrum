'use client';
import React from 'react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowBigRight } from 'lucide-react';
const Navbar = () => {
  const [isUser, isSetUser] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.status === 401) {
          isSetUser(false)
        }
        isSetUser(true);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="max-w-7xl mx-auto bg-neutral-900 p-2 m-6 rounded-xl flex justify-between items-center w-full ">
      <h1 className='text-3xl font-bold text-white m-1'>
        WELCOME
      </h1>
      <Link href={isUser ? '/dashboard' : '/SignIn'} className='flex'>
        <span className='bg-black text-white rounded-lg px-4 py-2 flex items-center border'>
          {
            isUser ? (
              <h1 className='flex'>Dashboard <ArrowBigRight /></h1>
            ) : (
              <h1 className='flex'>Login <ArrowBigRight /></h1>
            )
          }
        </span>
      </Link>
    </div>
  );
};

export default Navbar;
