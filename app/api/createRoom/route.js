import prisma from "@/utils/db"
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import axios from "axios"

export async function POST(req) {
    try {
        const { useremail, username, roomId } = await req.json()
        const session = await auth()
        console.log(session)

        // Check if the session exists
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        // Validate user input
        if (!useremail) {
            return NextResponse.json({ message: 'User email is required' }, { status: 400 })
        }
        if (!roomId || roomId.length < 1 || !/^[a-zA-Z0-9]+$/.test(roomId)) {
            return NextResponse.json({ message: 'Invalid room ID' }, { status: 400 })
        }

        // Fetch user data from Spotify
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${session.user.accessToken}`
            }
        }).catch(error => {
            console.error("Spotify API error:", error)
            return NextResponse.json({ message: 'Failed to fetch user data from Spotify' }, { status: 400 })
        })

        // Ensure the response data is structured correctly
        if (!response.data || !response.data.id) {
            console.error("Invalid Spotify response:", response.data)
            return NextResponse.json({ message: 'Invalid Spotify user data' }, { status: 400 })
        }

        const spotifyId = response.data.id // Use Spotify user ID

        // Upsert user into the database
        const user = await prisma.user.upsert({
            where: { email: useremail },
            update: {},
            create: {
                email: useremail,
                name: username,
                spotifyId
            }
        })

        // Find or create a room
        let room = await prisma.room.findUnique({
            where: { id: roomId }
        })

        if (!room) {
            try {
                room = await prisma.room.create({
                    data: {
                        id: roomId,
                        name: `Room for ${session.user.name}`,
                        createdBy: {
                            connect: { id: user.id }
                        },
                        spotifyId
                    }
                })
            } catch (error) {
                console.error("Error creating room:", error)
                return NextResponse.json({ message: 'Failed to create room' }, { status: 500 })
            }
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                spotifyId,
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
