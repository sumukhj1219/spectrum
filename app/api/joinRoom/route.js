import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req) {
  try {
    const { roomId, useremail } = await req.json();

  const session = await auth();

  if (!useremail) {
    await prisma.user.create({
      data: {
        id: uuidv4(),
        name: session?.user.name,
        email: session?.user.email
      }
    });
    return NextResponse.json({ message: 'Not authenticated' }, { status: 400 });
  }

  if (!roomId) {
    return NextResponse.json({ message: 'Room ID is required' }, { status: 400 });
  }

  let room = await prisma.room.findUnique({
    where: { id: roomId },
  });
  
  if (!room) {
    // If the room does not exist, create it
    room = await prisma.room.create({
      data: {
        id: roomId,
        name: roomId,
      },
    });
  }

  // Check if the user exists
  let user = await prisma.user.findUnique({
    where: { email: useremail },
  });

  if (!user) {
    // If the user does not exist, create it with a generated UUID
    user = await prisma.user.create({
      data: {
        id: uuidv4(),
        name: session?.user.name || "Default Name",
        email: useremail
      }
    });
  }

  // Update the user's rooms connection
  await prisma.user.update({
    where: { email: useremail },
    data: {
      rooms: {
        connect: { id: roomId },
      },
    },
  });
  return NextResponse.json({ roomId }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ status: 200 });
  }
  

}
