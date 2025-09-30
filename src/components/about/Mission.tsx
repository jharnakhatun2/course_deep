import { FaLightbulb, FaShieldAlt, FaProjectDiagram } from "react-icons/fa";

const missionCards = [
  {
    icon: (
      <FaLightbulb className="text-3xl text-yellow-500 hover:text-teal-500 transition-smooth mx-auto" />
    ),
    title: "Innovative Learning",
    desc: "We design courses and tools that spark curiosity and encourage learners to think critically, explore deeply, and stay motivated throughout their journey.",
  },
  {
    icon: (
      <FaShieldAlt className="text-3xl text-yellow-500 hover:text-teal-500 transition-smooth mx-auto" />
    ),
    title: "Trusted & Ethical",
    desc: "Our platform is built on integrity. Every course is carefully reviewed to ensure accuracy, inclusivity, and a learner-first approach that promotes growth responsibly.",
  },
  {
    icon: (
      <FaProjectDiagram className="text-3xl text-yellow-500 hover:text-teal-500 transition-smooth mx-auto" />
    ),
    title: "Connected Growth",
    desc: "Learning doesn’t happen in isolation. We provide interactive tools, real-time feedback, and community-driven features to help learners grow together and achieve more.",
  },
];

const Mission = () => {
  return (
    <section className="bg-primary-50 rounded-xl pt-5 pb-20">
      <div className="text-center">
        <span className="text-xs uppercase text-teal-500 tracking-wider">
          Driven by Purpose
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-zinc-600 uppercase">
          Our Mission
        </h3>
        <p className="text-sm text-zinc-500 mb-8 lg:w-3/5 mx-auto">
          At Course Deep LMS, our mission is to make quality education
          accessible to everyone. We aim to empower learners and educators by
          combining interactive technology with modern teaching methods.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {missionCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white px-6 py-9 rounded-lg shadow-md w-full"
            >
              <div className="mb-4 text-center">{card.icon}</div>
              <h3 className="font-bold text-zinc-700 mt-5 mb-2 uppercase">
                {card.title}
              </h3>
              <p className="text-zinc-400 font-poppins text-sm text-justify">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
