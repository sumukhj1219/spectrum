import prisma from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export  async function POST(request) {
  try {
    const formValues = await request.json();
    const { name, email, password } = formValues;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User with credentials already exists." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "User created successfully." }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Something went wrong!" }, { status: 500 });
  }
}
