import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from 'jose';

const SECRET_KEY = new TextEncoder().encode("Sumukh@1219");

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found. Please register." },
        { status: 400 }
      );
    }

    const isMatching = await bcrypt.compare(password, existingUser.password);
    if (!isMatching) {
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 400 }
      );
    }

    const token = await new SignJWT({
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(SECRET_KEY);

    const response = NextResponse.json(
      { 
        message: "Login successful",
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'strict',
      maxAge: 3600,
      path: "/"
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}