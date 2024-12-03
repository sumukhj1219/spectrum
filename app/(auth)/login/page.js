'use client';

import { signIn } from "next-auth/react";

export default function Login() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn("spotify", { callbackUrl: "http://localhost:3000" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-extrabold mb-10 underline decoration-dotted text-gray-800">
        ALLOW{" "}
        <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
          SPECTRUM
        </span>{" "}
        TO ACCESS YOUR SPOTIFY PLAYLIST!
      </h1>
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-green-500 p-5 rounded-full border-white border-2 hover:bg-green-700 transition-all ease-in-out text-white"
        >
          <h1 className="text-lg">Login with Spotify</h1>
        </button>
      </form>
    </div>
  );
}
