import type { FC } from "react";

type CardData = {
  number: string;
  label: string;
  color: string; // any valid RGB color for glow
};

const cards: CardData[] = [
  { number: "320", label: "Courses", color: "255,221,51" },       // Yellow
  { number: "10,000+", label: "Students", color: "59,130,246" }, // Blue
  { number: "50+", label: "Expert Instructors", color: "236,72,153" }, // Pink
];

const NeonCards: FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6 px-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="max-w-xs w-full p-6 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 transition-shadow duration-300 hover:shadow-lg"
          style={{
            boxShadow: `0 0 25px rgba(${card.color},0.6)`,
          }}
        >
          {/* Number */}
          <div
            className="text-2xl md:text-4xl font-extrabold text-white mb-2"
            style={{
              textShadow: `0 0 15px rgba(${card.color},0.8)`,
            }}
          >
            {card.number}
          </div>

          {/* Label */}
          <h3 className="text-xl font-semibold text-white">{card.label}</h3>
        </div>
      ))}
    </div>
  );
};

export default NeonCards;
