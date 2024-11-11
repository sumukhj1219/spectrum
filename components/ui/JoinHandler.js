'use client'

import React, { useState } from 'react'
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from 'next/navigation'; 
import { useSession } from 'next-auth/react';

const JoinHandler = () => {
  const [roomId, setRoomId] = useState("");
  const {data: session}  = useSession()
  const router = useRouter();  
  
  const handleClick = async () => {
    try {
      const useremail = session?.user.email
      console.log(session)
      const response = await axios.post('/api/joinRoom', { roomId , useremail });
      setRoomId("")
      
      // router.push(`/joinRoom/${response.data.roomId}`);
    } catch (error) {
      console.error('Failed to join room:', error);
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
          label={'Please enter Room ID.'}
        />
        <Button
          name={'Join'}
          className={'bg-green-400 w-32 py-2 text-white font-bold rounded-lg mt-6 border-green-950'}
          onClick={handleClick} 
        />
      </div>
    </div>
  )
}

export default JoinHandler;
