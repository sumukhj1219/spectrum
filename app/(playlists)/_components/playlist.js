'use client'
import React, { useState } from 'react'
import Tracks from './tracks'
import RotatingDisc from '@/components/ui/RotatingDisc'

const Playlist = ({ items, playlistid }) => {
  const [playlistId, setPlaylistId] = useState(playlistid)
  const [playlistName, setPlaylistName] = useState("")
  const [currentTrackImage, setCurrentTrackImage] = useState("") 

  function handlePlaylists(pId, pName) {
    setPlaylistId(pId)
    setPlaylistName(pName)
  }

  return (
    <div className='grid grid-cols-8 overflow-hidden'>
      <div
        className='relative flex flex-col col-span-2 justify-start items-center m-2 rounded-xl bg-black bg-transparent bg-opacity-50 overflow-hidden'
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${currentTrackImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(8px)', // Apply blur to the background only
            transform: 'scale(1.1)', // Slightly scale up for a soft effect around edges
          }}
        ></div>
        
        <div className='relative z-10 p-4 '>
          <h1 className='text-3xl font-extrabold'>Playlists</h1>
          <div className='border w-36 bg-transparent'></div>
          {items.map((playlist) => (
            <div
            key={playlist.id}

              className={`p-3 ring-2 ${playlistId === playlist.id ? 'ring-green-400' : 'ring-white'}  bg-transparent bg-neutral-950 bg-opacity-50 m-4 w-52 rounded-xl flex items-center justify-center `}
              onClick={() => handlePlaylists(playlist.id, playlist.name)}
            >
              <span className={`font-extrabold ${playlistId === playlist.id ? 'text-green-400' : 'text-white'}  text-xl `}>{playlist.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div
        className='col-span-4 flex flex-col justify-between items-center rounded-xl'
        style={{
          height: '700px',
          width: '600px',
          backgroundImage: `url(${currentTrackImage})`,
          backgroundSize: 'cover',
        }}
      >
        <div className="flex-grow" />
        <RotatingDisc imgUrl={currentTrackImage} />
      </div>
      
      <div className='col-span-2 flex-col justify-center items-center overflow-clip'>
        <div className='mt-4 w-full'>
          <Tracks playlistId={playlistId} onTrackSelect={setCurrentTrackImage} />
        </div>
        <div className='bg-white bg-opacity-30 rounded-xl size-64 w-full m-1 mr-2  flex items-center justify-center '>
          
        </div>
      </div>
    </div>
  )
}

export default Playlist
