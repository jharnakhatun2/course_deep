import { FaLightbulb, FaShieldAlt, FaProjectDiagram } from "react-icons/fa";


 const missionCards = [
    {
      icon: <FaLightbulb className="text-3xl text-yellow-500 " />,
      title: "Augmented Intelligence",
      desc: "We build tools that enhance human cognition, not replace it.",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-yellow-500" />,
      title: "Ethical Framework",
      desc: "Every system undergoes rigorous ethical review before deployment.",
    },
    {
      icon: <FaProjectDiagram className="text-3xl text-yellow-500" />,
      title: "Neural Synthesis",
      desc: "Our proprietary architecture mimics human neural pathways.",
    },
  ];


const Mission = () => {
  return (
    <section className="bg-primary-50 rounded-xl p-12 mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              "To empower learners and educators by providing an accessible,
              interactive, and engaging online learning platform that helps
              everyone achieve their goals."
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {missionCards.map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-md w-full sm:w-64"
                >
                  <div className="mb-4 text-center">{card.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  )
}

export default Mission