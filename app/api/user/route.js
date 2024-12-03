import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = "Sumukh@1219";

export async function GET(req) {
  const token = req.cookies.get("token");
    console.log(token)
  if (!token) {
    return NextResponse.json(
      { message: "Not authenticated" },
      { status: 401 }
    );
  }

  try {
    const user = jwt.verify(token.value, "Sumukh@1219");
    return NextResponse.json({ user });
  } catch (error) {
    console.error("JWT verification error:", error);
    return NextResponse.json(
      { message: "Invalid token" },
      { status: 401 }
    );
  }
}
