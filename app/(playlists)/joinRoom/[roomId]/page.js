'use server'

import prisma from '@/utils/db'
import { redirect } from 'next/navigation'

const PlaylistPage = async({ params }) => {
  const { roomId } = await params;

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: {
      createdBy: true, 
    },
  });

  return (
    <div className='flex flex-col'>
      <span>{roomId}</span>
      <span>{room.createdBy?.name} Room</span> 
    </div>
  );
};

export default PlaylistPage;
