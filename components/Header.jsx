// components/Header.jsx
import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session-cookie")?.value;
  let isLoggedIn = false;

  if (sessionId && process.env.MONGODB_URI) {
    try {
      const [{ default: connectDB }, { default: Session }] = await Promise.all([
        import("@/lib/db"),
        import("@/models/Session"),
      ]);

      await connectDB();
      const session = await Session.findById(sessionId).lean();
      isLoggedIn = !!session && new Date(session.expiresAt) > new Date();
    } catch {
      // Keep header render-safe during build/not-found prerender.
      isLoggedIn = false;
    }
  }

  return (
    <div className="top-0 fixed w-screen z-200 border-b border-gray-100/30 bg-black/60 backdrop-blur-3xl">
      <HeaderClient isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Header;