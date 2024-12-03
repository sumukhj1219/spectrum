'use server'

import { auth } from '@/auth';
import prisma from '@/utils/db';
import axios from 'axios';
import Playlist from '../../_components/playlist';

const PlaylistPage = async ({ params }) => {
  const { roomId } = await params;
  const session = await auth();

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      createdBy: true,
    },
  });

  console.log(room.spotifyId);

  if (!room)
    return (
      <div className="">No room was Found</div>
    );

  let playlist = [''];
  try {
    const response = await axios.get(`https://api.spotify.com/v1/users/${room.spotifyId}/playlists`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`
      }
    });

    playlist = response.data.items
      .filter((item) => item.name.toLowerCase() !== 'testingplaylist') // Exclude 'testingplaylist'
      .reverse(); // Reverse the order

    playlist.pop(); // Remove the last playlist if needed
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className="flex gap-x-4">
        <span className="text-xl font-bold">{roomId}</span>
        <span className="text-xl font-bold">Created by {room.createdBy?.name}</span>
      </div>
      <Playlist items={playlist} playlistid={playlist[0]?.id} />
    </>
  );
};

export default PlaylistPage;
