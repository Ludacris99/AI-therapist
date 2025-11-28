'use client'

import Ripple from "@/components/ripple";
import Link from "next/link";
import { motion } from "motion/react";

export default function Home() {

  const features = [
    {
      icon: "/clock.svg",
      title: "24/7 Support",
      delay: 0.2,
    },
    {
      icon: "/bulb.svg",
      title: "Smart Insights",
      delay: 0.4,
    },
    {
      icon: "/lock.svg",
      title: "Private & Secure",
      delay: 0.6,
    },
    {
      icon: "/medical.svg",
      title: "Evidence Based",
      delay: 0.8,
    },
  ];

  return (
    <>
      <motion.div
        className="relative w-screen mx-auto h-[90vh]"
        initial={{ opacity: 0, y: 20 }}   // start faded + slightly down
        animate={{ opacity: 1, y: 0 }}    // end fully visible + original position
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

        {/* Ripple Part */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -z-100">
          <Ripple />
        </div>

        {/* Main Text Part */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-100 flex flex-col items-center justify-center gap-16 max-lg:gap-12">

          <div className="bg-black/20 border-b-[0.5px] border-emerald-50 rounded-full w-fit text-center font-semibold py-2 px-4 flex gap-2">
            <img src="/wave.svg" alt="wave" height={25} width={25} />
            <p className="text-lg">Your AI mental health companion</p>
          </div>

          <div className="text-center font-bold text-8xl max-md:text-6xl max-sm:text-4xl">
            Find <span className="soft-green">Peace</span><br /> of <span className="soft-green">Mind</span>
          </div>

          <div className="text-lg max-md:text-sm text-gray-400 font-medium w-140 max-md:w-100 text-center">
            Experience a new way of emotional support. Our AI companion is here to listen, understand, and guide you through life's journey.
          </div>

        </div>

      </motion.div>

      {/* Button and GIF section */}
      <motion.div
        className="w-full flex flex-col items-center justify-center gap-8 -translate-y-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <Link href="/dashboard">
            <button className="px-5 py-3 soft-green-bg rounded-full hover:px-6 active:scale-95 transition-all cursor-pointer font-semibold group max-sm:px-3">Start Session
              <span><img src="/arrow-right.svg" alt="arrow" height={20} width={20} className="inline group-hover:translate-x-2 transition-all" /></span>
            </button>
          </Link>
        </div>

        <div>
          <img src="/scroll.gif" alt="scroll" className="h-12 max-sm:h-8 hover:shadow-amber-100 hover:shadow-2xl transition-all" />
        </div>
      </motion.div>

      {/* Features Section */}
      <section>
        <div className="max-w-6xl mx-auto text-6xl max-md:text-3xl soft-blue font-bold text-center mb-16">
          How PeaceAI Helps You <br />
          <span className="font-semibold text-3xl max-md:text-xl text-white">Experience a new way of emotional support</span>
        </div>

        <div className="w-[70vw] mx-auto gap-8 grid lg:grid-cols-4 max-lg:grid-cols-2 max-md:grid-cols-1 place-items-center">
          {features.map((item, index) => (
            <motion.div
              key={index}
              className="h-[300] w-[300] max-md:h-[200] max-md:w-[90vw] soft-blue-bg hover:bg-[#239BA7] transition-all rounded-2xl p-1"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: item.delay,
                duration: 0.5
              }}
              viewport={{ once: true }}
            >
              <div className="relative group h-full w-full rounded-2xl bg-background flex items-center justify-center">

                <div className="absolute"><img src={item.icon} alt={item.title} className="h-[250] w-[250] max-md:h-[150] max-md:w-[150] opacity-40 group-hover:opacity-100 group-hover:drop-shadow-[0_0_10px_#3b82f6] transition-all" /></div>
                <div className="absolute z-10 text-4xl font-bold w-[150] text-center">{item.title}</div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 py-4 border-t border-gray-800 text-gray-400 text-center">
        A Project by Paavan Patni
      </footer>
    </>
  )
}
