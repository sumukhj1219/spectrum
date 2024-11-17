'use client'

import React, { useState } from 'react'
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from 'next/navigation'; 
import { useSession } from "next-auth/react"

const JoinHandler = () => {
  const { data: session } = useSession()
  const [roomId, setRoomId] = useState("");
  const router = useRouter();  
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false) // Error state

  const handleClick = async () => {
    setLoading(true)
    if (!roomId) {
      setError('Room ID is required');
      return;
    }

    try {
      const useremail = session?.user?.email;

      // const response = await axios.post('/api/joinRoom', { roomId, useremail });

      setLoading(false)
      setRoomId("");  // Clear room ID after success
      setError(null);  // Clear any previous errors

      router.push(`/joinRoom/${response.data.roomId}`);
    } catch (e) {
      setError('Failed to join room. Please try again later.');
    } 
  };

  return (
    <div className='pt-20 flex flex-col items-center'>
      <span className='text-white font-bold text-4xl mb-6'>Join Room</span>
      <div className="flex flex-col items-center gap-y-4">
        <Input
          className={'border-white border rounded-lg text-center text-white w-72 bg-transparent py-2 px-4'}
          placeholder={'aaa-bbb-ccc'}
          onChange={(e) => setRoomId(e.target.value)}
        />
        {error && <div className="text-red-500 mt-2">{error}</div>}  {/* Error message display */}
        <Button
          name={loading ? 'Joining' : 'Join'}  // Show loading text
          className={`bg-green-400 w-32 py-2 text-white font-bold rounded-lg mt-6 border-green-950 $`}
          onClick={handleClick}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default JoinHandler;
