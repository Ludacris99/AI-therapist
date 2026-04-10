// components/Header.jsx
import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session-cookie")?.value;
  const isLoggedIn = !!sessionId;

  return (
    <div className="top-0 fixed w-screen z-200 border-b border-gray-100/30 bg-black/60 backdrop-blur-3xl">
      <HeaderClient isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Header;