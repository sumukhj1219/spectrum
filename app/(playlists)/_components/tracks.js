'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { FastAverageColor } from 'fast-average-color'  

const Tracks = ({ playlistId, onTrackSelect }) => {
  const { data: session } = useSession()
  const [tracks, setTracks] = useState([])
  const [bgColor, setBgColor] = useState('')  
  const [bgImage, setBgImage] = useState('')  

  useEffect(() => {
    const fetchTracks = async () => {
      if (!playlistId || !session?.user.accessToken) return

      try {
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`
          }
        })
        setTracks(response.data.items)
        onTrackSelect(response.data.items[0].track.album.images[0].url)
      } catch (error) {
        console.log('Error fetching tracks:', error)
      }
    }

    fetchTracks()
  }, [playlistId, session?.user.accessToken])

  const extractAverageColor = (imageUrl) => {
    console.log('Extracting color from image URL:', imageUrl)

    const fac = new FastAverageColor() 

    fac.getColorAsync(imageUrl)  
      .then((color) => {
        console.log('Average color extracted:', color.hex) 
        setBgColor(color.hex) 
        setBgImage(imageUrl) 
      })
      .catch((error) => {
        console.log('Error extracting color:', error)
        setBgColor('#000000') 
        setBgImage('')  

      })
  }

  const handleTrackClick = (imageUrl) => {
    extractAverageColor(imageUrl)
    onTrackSelect(imageUrl)  // Update the RotatingDisc image
  }

  useEffect(() => {
    if (bgColor) {
      document.body.style.backgroundColor = bgColor
      document.body.style.backgroundImage = bgImage
    }
  }, [bgColor])

  return (
    <div style={{ color: 'var(--foreground)', transition: 'background-color 0.3s ease' }} className='w-full rounded-xl'>
      {tracks.length > 0 ? (
        <ul style={{ maxHeight: '400px', overflowY: 'scroll' }} className='scroll-smooth'>
          {tracks.map((track) => (
            <li
              key={track.track.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                cursor: 'pointer'
              }}
              onClick={() => handleTrackClick(track.track.album.images[0].url)}  
              className={`bg-white bg-opacity-10 m-1 rounded-xl hover:brightness-11 hover:ring-2 ring-white`}
            >
              <img
                src={track.track.album.images[0].url}
                alt={track.track.name}
                style={{ width: '50px', height: '50px', marginRight: '10px' }} 
                className='rounded-xl hover:brightness-110'
              />
              <span className={`text-lg font-extrabold text-slate-100`}
              >
              {track.track.name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tracks available</p>
      )}
    </div>
  )
}

export default Tracks
