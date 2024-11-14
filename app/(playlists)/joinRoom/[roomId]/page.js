'use server'

import { auth } from '@/auth';
import prisma from '@/utils/db'
import axios from 'axios';

const PlaylistPage = async({ params }) => {
  const { roomId } = await params;
  const session = await auth()

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      createdBy: true,
    },
  });

  console.log(room.spotifyId)

  if(!room)
  return (
    <div className=''>No room was Found</div>
  )

  try {
    const response = await axios.get(`https://api.spotify.com/v1/users/${room.spotifyId}/playlists`, {
        headers: {
            Authorization: `Bearer ${session.access_token}`
        }
    });
    console.log(response.data); 
} catch (error) {
    console.log(error)
}

return (
    <div className='flex flex-col'>
      <span>Room ID {roomId}</span>
      <span>{room.createdBy?.name} Room</span> 
    </div>
  );
};

export default PlaylistPage;
