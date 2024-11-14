import prisma from "@/utils/db"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"

export async function POST(req) {
    try {
        const { username, useremail, roomId } = await req.json()
        const session = await auth()

        if (!useremail) {
            return redirect('/login')
        }

        if (!roomId || roomId.length < 1) {
            return NextResponse.json({ message: 'Room ID must be at least one character' }, { status: 400 })
        }

        const user = await prisma.user.upsert({
            where: { email: useremail },
            update: {},
            create: {
                email: useremail,
                name: username,
            }
        })

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

        await prisma.user.update({
            where: { id: user.id },
            data: {
                creatorAccessToken: session?.access_token,
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
