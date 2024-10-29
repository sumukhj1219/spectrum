'use client';
import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="max-w-7xl mx-auto bg-gray-900 p-2 z-10 m-2 rounded-xl border-gray-400 border-2 border-dashed flex justify-between items-center fixed">
      <h1 className='text-3xl font-bold text-white m-1'>
        WELCOME
      </h1>
      <Link href={'/login'} className='flex'>
        <span className='bg-black text-white rounded-lg px-4 py-2 flex items-center border-green-500 border'>
          {
            session?.user ? (
              <h1>{session.user.name}</h1>
            ) : (
              <h1>Sign In</h1>
            )
          }
        </span>
      </Link>
    </div>
  );
};

export default Navbar;
