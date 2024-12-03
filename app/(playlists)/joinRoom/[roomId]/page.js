'use server';

import { auth } from '@/auth';
import prisma from '@/utils/db';
import axios from 'axios';
import Playlist from '../../_components/playlist';

const PlaylistPage = async ({ params }) => {
  const { roomId } = await params;

  const session = await auth();
  if (!session?.user?.accessToken) {
    return <div>User is not authenticated.</div>;
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      createdBy: true,
    },
  });

  if (!room) {
    return <div>No room was found</div>;
  }

  let playlist = [];
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });

    playlist = response.data.items;
    console.log('Playlists:', playlist);
  } catch (error) {
    console.error('Error fetching playlists:', error.response?.data || error.message);
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
