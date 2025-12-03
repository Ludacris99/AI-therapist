import { motion } from "motion/react";

const benefits = [
  { title: "Reduces Stress", desc: "Calms the mind and lowers cortisol levels.", icon: "🧘‍♂️" },
  { title: "Improves Focus", desc: "Enhances attention and mental clarity.", icon: "🎯" },
  { title: "Boosts Emotional Health", desc: "Promotes positivity and emotional balance.", icon: "💛" },
  { title: "Better Sleep", desc: "Quiets the mind and supports deeper rest.", icon: "😴" },
  { title: "Self-Awareness", desc: "Helps you understand thoughts and patterns.", icon: "🔍" },
  { title: "Reduces Anxiety", desc: "Encourages calmness and reduces overthinking.", icon: "🌿" },
];

export default function MeditationBenefitsCarousel() {

  return (
    <div className="w-full py-10 overflow-hidden">

      {/* Title */}
      <h2 className="text-3xl max-md:text-2xl soft-green font-bold text-center mb-10">
        Benefits of Meditation
      </h2>

      {/* Auto-scroll carousel */}
      <div>
        <motion.div
          className="flex gap-6 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {/* Repeat list twice for seamless loop */}
          {[...benefits, ...benefits].map((benefit, index) => (
            <div
              key={index}
              className="min-w-[260px] p-6 bg-[#111111] rounded-xl border border-[#658C58] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{benefit.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-500 text-sm">{benefit.desc}</p>

            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
