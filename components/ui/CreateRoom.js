'use client'
import React, { useState } from 'react'
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from 'axios';
import { useSession } from 'next-auth/react';

const CreateRoomHandler = () => {
  const [roomId, setRoomId] = useState("")
  const {data: session} = useSession()
  const [loading, setLoading] = useState(false)

  const useremail = session?.user?.email
  const username = session?.user?.name
 

  async function handleCreate() {
    setLoading(true)
    const response = await axios.post('/api/createRoom', {username, useremail, roomId})
    if(response.status === 200)
    {
    console.log('Room created successfully')
    setLoading(false)
    }
    console.log(roomId)
  }

  return (
    <div className='pt-20 flex flex-col items-center'>
      <span className='text-white font-bold text-4xl mb-6'>Create Room</span>
      <div className="flex flex-col items-center gap-y-4">
        <Input
          className={'border-white border rounded-lg text-center text-white w-72 bg-transparent py-2 px-4'}
          placeholder={'aaa-bbb-ccc'}
          onChange={(e) => setRoomId(e.target.value)}
          label={'Please enter Room ID.'}
        />
        <Button
          name={loading ? 'Creating' : 'Create'}
          className={'bg-green-400 w-32 py-2 text-white font-bold rounded-lg mt-6 border-green-950'}
          onClick={handleCreate}
          loading={loading}
        />
      </div>
    </div>
  )
}

export default CreateRoomHandler;
