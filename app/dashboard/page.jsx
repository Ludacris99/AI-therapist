'use client'

import { motion } from "motion/react";
import Link from "next/link";
import NewChatButton from "../../components/ChatButton";

const dashboard = () => (
    <>
        <motion.div
            className="mt-50 max-md:mt-30 px-40 max-lg:px-20"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >

            <div className="w-full h-[300] mb-10 max-md:mb-60 flex max-md:flex-col items-center justify-around gap-5">

                {/* Welcome text */}
                <div className="flex items-center justify-center text-center text-6xl font-semibold max-lg:text-4xl max-md:text-2xl">
                    Welcome Back,<br /> insertUsernameHere
                </div>

                {/* Main Button */}
                <div className="border-[#658C58] border-2 rounded-2xl group hover:shadow-gray-900 shadow-2xl transition-all max-md:w-full">
                    <NewChatButton />
                </div>

            </div>

            <div className="w-full h-[300] flex max-md:flex-col items-center justify-center gap-10 max-md:mb-80">

                {/* Music Therapy */}
                <div className="outline-[#658C58] outline-2 hover:outline-none rounded-2xl group hover:bg-[#658C5880] transition-all max-md:w-full">
                    <Link
                        href="/music"
                        className="h-full w-full px-15 py-20 flex items-center justify-center gap-2 text-center text-2xl max-lg:text-lg font-semibold">
                        <span><img src="/music.svg" alt="music" height={50} width={50} /></span>
                        Music <br />Therapy
                    </Link>
                </div>

                {/* Meditation Exercise */}
                <div className="outline-[#658C58] outline-2 hover:outline-none rounded-2xl group hover:bg-[#658C5880] transition-all max-md:w-full">
                    <Link
                        href="/meditation"
                        className="h-full w-full px-15 py-20 flex items-center justify-center gap-2 text-center text-2xl max-lg:text-lg font-semibold">
                        <span><img src="/leaves.svg" alt="leaves" height={50} width={50} /></span>
                        Meditation <br />Exercise
                    </Link>
                </div>

                {/* Motivational Quotes */}
                <div className="outline-[#658C58] outline-2 hover:outline-none rounded-2xl group hover:bg-[#658C5880] transition-all max-md:w-full">
                    <Link
                        href="/quotes"
                        className="h-full w-full px-15 py-20 flex items-center justify-center gap-2 text-center text-2xl max-lg:text-lg font-semibold">
                        <span><img src="/eureka.svg" alt="eureka" height={50} width={50} /></span>
                        Motivational <br />Quotes
                    </Link>
                </div>

            </div>



        </motion.div>
    </>
)

export default dashboard;