'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderClient({ isLoggedIn }) {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/logout", { method: "POST" });
        router.refresh();
    };

    return (
        <div className="py-2 flex items-center justify-around max-sm:scale-80">

            {/* Logo */}
            <Link href="/" className="flex items-center h-14 -space-x-5 overflow-clip">
                <Image src="/logo.svg" width={50} height={50} alt="logo" className="z-10" />
                <Image src="/logoname.svg" width={150} height={30} alt="name" className="translate-y-1" />
            </Link>

            {/* Nav Items */}
            <div>
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="cursor-pointer w-30 bg-[#07C847]/70 px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all"
                    >
                        Sign-Out
                    </button>
                ) : (
                    <Link href="/login">
                        <button className="cursor-pointer w-30 bg-[#07C847]/70 px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all">Sign-In</button>
                    </Link>
                )}
            </div>

        </div>
    );
}

