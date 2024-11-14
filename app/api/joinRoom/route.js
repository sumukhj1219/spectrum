import prisma from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { roomId, useremail } = await req.json();

    if (!roomId) {
      return NextResponse.json({ message: 'Room ID is required' }, { status: 404 });
    }

    let room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json({message: 'No room exist'}, {status: 404})
    }

    await prisma.user.update({
      where: { email: useremail },
      data: {
        rooms: {
          connect: { id: roomId },
        },
      },
    });

    return NextResponse.json({ roomId, message: 'User added to room successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in joining room:', error); 
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 404 });
  }
}
