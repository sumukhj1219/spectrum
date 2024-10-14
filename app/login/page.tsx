"use client"; // This marks the component as a client-side component

import { auth } from '@/auth';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const Login = async() => {

  return (
    <div>
      <button onClick={() => signIn('spotify', { redirectTo: "/" })}>
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
