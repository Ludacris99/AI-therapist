// components/Header.jsx
import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import Session from "@/models/Session";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  await connectDB();

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session-cookie")?.value;
  const session = sessionId ? await Session.findById(sessionId) : null;

  const isLoggedIn = !!session; // or add expiry check if you want

  return (
    <div className="top-0 fixed w-screen z-200 border-b border-gray-100/30 bg-black/60 backdrop-blur-3xl">
      <HeaderClient isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Header;