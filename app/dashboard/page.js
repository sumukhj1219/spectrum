"use client";
import { useEffect, useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { auth } from "@/auth";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [roomId, setRoomId] = useState("")
  const [j_roomId, j_setRoomId] = useState("")

  const {data:session} = useSession()
  const router = useRouter()

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await signIn("spotify", { callbackUrl: "http://localhost:3000/dashboard" });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  console.log(session)

  const handleJoin =async(e)=>{
    try {
      router.push(`/joinRoom/${j_roomId}`)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreate = async(e)=>{
    try {
      const username = user.name
      const useremail = user.email
      const response = await axios.post('/api/createRoom', {username, useremail, roomId})
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user");
        if (res.status === 401) {
          router.push("/SignIn")
        }
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto m-4">
      <h1 className="text-5xl font-extrabold">Welcome, {user.name}</h1>
      <div className="flex flex-col mt-40 space-y-2">
        <label htmlFor="room" className="text-xl rounded-xl font-extrabold w-72 p-3 bg-neutral-900">
          Join Room
        </label>
        <div className="flex">
        <input
          id="room"
          type="text"
          value={j_roomId}
          onChange={(e)=>j_setRoomId(e.target.value)}
          placeholder="Room code"
          className="w-72 text-lg p-2 border bg-transparent border-gray-400 rounded-md focus:outline-none"
        />
        <button onClick={handleJoin} className="p-3 text-lg  ml-2 rounded-lg bg-green-400 text-black font-bold">Join</button>
        </div> 
      </div>

      <div className="flex flex-col mt-10 space-y-2">
        <label htmlFor="room" className="text-xl rounded-xl font-extrabold w-72 p-3 bg-neutral-900">
          Create Room
        </label>
        <span className="text-sm text-slate-400">⚠️ Only spotify premium members can create the room if you are not subscribed yet then please join any room.</span>
        <div className="flex">
        <button onClick={handleClick} className="mr-4 p-3 flex border hover:bg-green-700 bg-green-600 text-xl border-gray-400 rounded-lg"><FaSpotify className="mt-1 mr-1" />Login with Spotify</button>
        <input
          id="room"
          type="text"
          value={roomId}
          onChange={(e)=>setRoomId(e.target.value)}
          placeholder="Room code"
          className="w-72 text-lg p-2 border bg-transparent border-gray-400 rounded-md focus:outline-none"
        />
        <button onClick={handleCreate} className="p-3 text-lg  ml-2 rounded-lg bg-green-400 text-black font-bold">Create</button>
        </div> 
      </div>
    </div>
  );
}
