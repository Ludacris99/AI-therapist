'use client'

import Link from "next/link";
import { easeIn, motion } from "motion/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const login = () => {

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!mail || !password || !username) {
            setError("All fields are required");
            return;
        }

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, mail, password }),
        });

        const data = await res.json();

        // Error if registration failed
        if (!res.ok) {
            setError(data.message);
            return;
        }

        // Success message if no errors
        alert(data.message);
        router.push("/login");
    }

    return (
        <motion.div
            className="mt-20 h-[90vh] w-screen flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: easeIn }}
        >

            <form
                onSubmit={handleSubmit}
                className="w-[40vw] max-lg:w-[80vw] bg-zinc-900 drop-shadow-[0_0_10px_#7ADAA5] rounded-2xl border-2 border-[#7ADAA5] px-10 max-md:px-5 py-15"
            >

                <h2 className="text-4xl max-md:text-3xl font-extrabold text-center text-white">Create an Account</h2>

                <div className="mt-10">

                    <label className="text-sm font-medium text-zinc-200">Username</label>
                    <input
                        placeholder="What would you like us to call you?"
                        className="mb-6 w-full px-4 py-3 mt-4 border-2 rounded-lg border-zinc-600 bg-zinc-800 text-zinc-200 focus:outline-none"
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <label className="text-sm font-medium text-zinc-200">Email</label>
                    <input
                        placeholder="abc@123.com"
                        className="mb-6 w-full px-4 py-3 mt-4 border-2 rounded-lg border-zinc-600 bg-zinc-800 text-zinc-200 focus:outline-none"
                        type="email"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />

                    <label className="text-sm font-medium text-zinc-200">Password</label>
                    <input
                        placeholder="••••••••"
                        className="w-full px-4 py-3 mt-4 border-2 rounded-lg border-zinc-600 bg-zinc-800 text-zinc-200 focus:outline-none"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="mt-16 mb-2">
                        <button
                            className="w-full px-4 py-3 text-white soft-green-bg rounded-lg cursor-pointer"
                            type="submit">
                            Let's Go
                        </button>
                    </div>


                </div>
                <div className="px-8 py-4 text-sm soft-green text-center">
                    Already have an account? <span><Link href="/login" className="underline font-bold">Sign-In</Link></span>
                </div>
            </form>

        </motion.div>
    );
}

export default login;