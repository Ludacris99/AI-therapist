import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Session from "@/models/Session";
import HeaderClient from "./HeaderClient";

const Header = async () => {
    await connectDB();

    // Read HTTP-only cookie on the server
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session-cookie")?.value;
    const session = sessionId ? await Session.findById(sessionId) : null;

    return (
        <div className="top-0 fixed w-screen z-200 border-b border-gray-100/30 bg-black/60 backdrop-blur-3xl">
            <HeaderClient isLoggedIn={!!session} />
        </div>
    );
};

export default Header;