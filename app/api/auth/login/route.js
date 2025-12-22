import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import Session from "@/models/Session";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const { mail, password } = await req.json();

        // Basic validation to avoid undefined lookups
        if (!mail || !password) {
            return NextResponse.json(
                { message: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Check if user exists or not
        const existingUser = await User.findOne({ email: mail });

        if (!existingUser) {
            return NextResponse.json(
                { message: "User doesn't exist!" },
                { status: 404 }
            );
        }

        // Compare the encrypted version of passwords
        const storedHashPassword = existingUser.password;
        const doPasswordMatch = await bcrypt.compare(password, storedHashPassword);

        if (doPasswordMatch) {
            await createSession(existingUser._id.toString());

            return NextResponse.json(
                { message: "User logged in successfully" },
                { status: 201 }
            );
        }

        return NextResponse.json(
            { message: "Email and Passwords don't match!" },
            { status: 409 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}

async function createSession(userId) {
    // Set expiry e.g., A week from now
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
    // Store in MongoDB
    const session = await Session.create({
      userId: userId,
      expiresAt: expiresAt
    });
    const sessionId = session._id.toString();
  
  // Store in an HTTP-only Cookie
  const cookieStore = await cookies();
  cookieStore.set("session-cookie", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  }
