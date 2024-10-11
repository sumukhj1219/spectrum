"use client"; // This marks the component as a client-side component

import { signIn } from 'next-auth/react';
import React from 'react';

const Login = () => {
  return (
    <div>
      <button onClick={() => signIn('spotify', { callbackUrl: "/" })}>
        Login to Spotify
      </button>
    </div>
  );
}

export default Login;
