import Ripple from "@/components/ripple";

export default function Home() {
  return (
    <>
      <div className="relative w-full h-[80vh] z-10 flex items-center justify-center mt-15">

        <div className="absolute text-center z-100 font-bold text-7xl">Find <span className="text-[#7ADAA5]">Peace</span><br /> of <span className="text-[#7ADAA5]">Mind</span></div>

        <div className="absolute top-60 z-100 bg-[#7ADAA5]/50 rounded-full w-80 text-center font-semibold py-2 px-4 flex gap-2 scale-120">
          <img src="/wave.svg" alt="wave" height={20} width={20} />
          <p>Your AI mental health companion</p>
        </div>

        <div className="z-100 absolute bottom-0 flex flex-col items-center justify-center gap-5">
          <p className="font-semibold text-2xl">Our AI companion is here to listen, understand and guide you through life's journey.</p>

          <button className="px-5 py-3 bg-[#7ADAA5]/60 rounded-full hover:scale-105 active:scale-95 cursor-pointer transition-all">Begin Journey</button>
 
          <div><img src="/scroll.gif" alt="scroll" height={30} width={30} /></div>
        </div>

        <Ripple />

      </div>
    </>

  )
}
