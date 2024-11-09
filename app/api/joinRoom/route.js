import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { roomId, userId } = await req.json();
  
  if(!userId) {
    return NextResponse.json({message:'Not authenticated'}, {status: 599})
  }
  if (!roomId) {
    return NextResponse.json({ message: 'Room ID is required' }, { status: 400 });
  }

  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    await prisma.room.create({
      data: {
        id: roomId,
        name: roomId,
      },
    });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      rooms: {
        connect: { id: roomId },
      },
    },
  });

  return NextResponse.json({ roomId }, { status: 200 });
}
