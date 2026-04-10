import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, mail, password } = await req.json();

    if (!username || !mail || !password) {
      return NextResponse.json(
        { message: "Username, email and password are required" },
        { status: 400 }
      );
    }

    // Connect DB
    await connectDB();

    // Check for existing user
    const existingUser = await User.findOne({ email: mail.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    // Encrypt password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    await User.create({
      username,
      email: mail.toLowerCase(),
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    if (error?.name === "MongooseServerSelectionError") {
      return NextResponse.json(
        { message: "Database unavailable. Please try again in a moment." },
        { status: 503 }
      );
    }

    if (error?.code === 11000) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
