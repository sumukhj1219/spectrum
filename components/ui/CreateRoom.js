'use client'
import React, { useState } from 'react'
import Button from "@/components/Button";
import Input from "@/components/Input";

const JoinHandler = () => {
  const [roomId, setRoomId] = useState("")

  function handleJoin() {
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
          name={'Create'}
          className={'bg-green-400 w-32 py-2 text-white font-bold rounded-lg mt-6 border-green-950'}
          onClick={handleJoin}
        />
      </div>
    </div>
  )
}

export default JoinHandler;
