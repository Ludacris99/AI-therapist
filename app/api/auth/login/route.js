import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Session from "@/models/Session";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { mail, password } = await req.json();

    if (!mail || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email: mail.toLowerCase() });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User doesn't exist!" },
        { status: 404 }
      );
    }

    const storedHashPassword = existingUser.password;
    const doPasswordMatch = await bcrypt.compare(password, storedHashPassword);

    if (!doPasswordMatch) {
      return NextResponse.json(
        { message: "Email and Passwords don't match!" },
        { status: 409 }
      );
    }

    // Use helper to create session in DB
    const { sessionId, expiresAt } = await createSession(existingUser._id.toString());

    // Create response and attach cookie (this is the key change)
    const res = NextResponse.json(
      { message: "User logged in successfully" },
      { status: 201 }
    );

    res.cookies.set("session-cookie", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (error) {
    console.error(error);

    if (error?.name === "MongooseServerSelectionError") {
      return NextResponse.json(
        { message: "Database unavailable. Please try again in a moment." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function createSession(userId) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const session = await Session.create({
    userId,
    expiresAt,
  });

  const sessionId = session._id.toString();

  // just return info; don't touch cookies here
  return { sessionId, expiresAt };
}