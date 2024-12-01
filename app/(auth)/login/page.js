'use client'
import { signIn } from "next-auth/react"; // Ensure this import

export default function login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    signIn("spotify", { callbackUrl: "https://spectrum-bice.vercel.app/" });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-extrabold mb-10 underline decoration-dotted">
        ALLOW <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
          SPECTRUM
        </span> TO ACCESS YOUR SPOTIFY PLAYLIST!
      </h1>
      <form onSubmit={handleSubmit}>
        <button type="submit" className="bg-green-500 p-5 rounded-full border-white border-2 hover:bg-green-700 transition-all ease">
          <h1 className="text-lg">
            Login with Spotify
          </h1>
        </button>
      </form>
    </div>

  );
}
