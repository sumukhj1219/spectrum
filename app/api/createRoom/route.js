import prisma from "@/utils/db"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { username, useremail, roomId } = await req.json()
        
        if (!useremail) {
            return redirect('/login')
        }
        
        if (!roomId || roomId.length < 1) {
            return NextResponse.json({ message: 'Room ID must be at least one character' }, { status: 400 })
        }

        // Upsert to ensure the user exists
        const user = await prisma.user.upsert({
            where: { email: useremail },
            update: {},
            create: {
                email: useremail,
                name: username,
            },
        })

        // Find the room or create it with the user as the creator
        let room = await prisma.room.findUnique({
            where: { id: roomId }
        })

        if (!room) {
            room = await prisma.room.create({
                data: {
                    id: roomId,
                    name: `Room for ${username}`,
                    createdBy: {
                        connect: { id: user.id }
                    }
                }
            })
        }

        // Connect the user to the room as a member
        await prisma.user.update({
            where: { id: user.id },
            data: {
                rooms: {
                    connect: { id: room.id }
                }
            }
        })

        return NextResponse.json({ message: 'User and room created successfully' }, { status: 200 })
    } catch (error) {
        console.error("Error creating user or room:", error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}
