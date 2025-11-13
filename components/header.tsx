import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <div className="fixed top-0 w-full px-30 py-5 border-b border-gray-100">
            <div className="flex justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center justify-center gap-1">
                    <Image src="/logo.svg" width={50} height={50} alt="logo" />
                    <p className="text-2xl font-medium">PeaceAI</p>
                </Link>

                {/* Nav Items */}
                <div className="flex items-center justify-center gap-15">
                    <Link href="/features"><p className="text-gray-400 hover:scale-110 hover:text-white hover:cursor-pointer transition-all">Features</p></Link>
                    <Link href="/about"><p className="text-gray-400 hover:scale-110 hover:text-white hover:cursor-pointer transition-all">About Us</p></Link>

                {/* signup button */}
                <Link href="/signup">
                    <button className="cursor-pointer w-30 bg-[#3F7D58] px-5 py-3 rounded-2xl font-bold hover:scale-105 transition-all">Sign-Up</button>
                </Link>
                </div>

            </div>
        </div>
    );
}

export default Header;