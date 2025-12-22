import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const {username, mail, password} = await req.json();

    // Connect DB
    await connectDB();

    // Check for existing user
    const existingUser = await User.findOne({ mail });
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
      username: username,
      email: mail,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
