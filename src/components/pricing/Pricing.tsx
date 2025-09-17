import React from "react";
import SectionTitle from "../../ult/title/SectionTitle";

type Plan = {
  id: number;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    id: 1,
    name: "Starter",
    price: "Free",
    description:
      "Perfect for beginners who want to explore coding basics at no cost.",
    features: [
      "Access to free courses",
      "Basic coding challenges",
      "Community forum support",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: "$19",
    period: "/month",
    description:
      "Great for learners who want structured learning with extra features.",
    features: [
      "Everything in Free",
      "Access to all premium courses",
      "Weekly live sessions",
      "Certificate of completion",
    ],
    highlighted: true,
  },
  {
    id: 3,
    name: "Team",
    price: "$59",
    period: "/month",
    description:
      "For teams and organizations who want to train together effectively.",
    features: [
      "Everything in Pro",
      "Team progress tracking",
      "Dedicated mentor support",
      "Private group projects",
      "Admin dashboard",
    ],
  },
];

const Pricing: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100 text-gray-900">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <span className="flex justify-center text-xs uppercase text-yellow-400 text-center">
          Pricing Plan
        </span>
        <SectionTitle
          title=" Choose Your Learning Plan"
          className="text-zinc-600 pb-16"
        />

        {/* Pricing Plans */}
        <div className="flex flex-wrap -mx-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0"
            >
              <div
                className={`flex flex-grow flex-col p-6 space-y-6 border border-white/50 sm:p-8 ${
                  plan.highlighted
                    ? "bg-yellow-500/60 shadow-2xl text-white backdrop:lg"
                    : "bg-white/20 text-gray-900 backdrop:lg shadow-lg"
                }`}
              >
                <div className="space-y-2">
                  <h4
                    className={`text-xl font-bold ${
                      plan.highlighted ? "text-white" : "text-teal-500"
                    }`}
                  >
                    {plan.name}
                  </h4>
                  <span className="text-5xl font-bold">
                    {plan.price}
                    {plan.period && (
                      <span className="text-base font-normal tracking-wide ml-1">
                        {plan.period}
                      </span>
                    )}
                  </span>
                </div>

                <p
                  className={`leading-relaxed ${
                    plan.highlighted ? "text-yellow-50" : "text-gray-600"
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className={`flex-shrink-0 w-6 h-6 ${
                          plan.highlighted ? "text-white" : "text-yellow-500"
                        }`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 
                          1 0 00-1.414-1.414L9 10.586 7.707 
                          9.293a1 1 0 00-1.414 1.414l2 2a1 
                          1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className={`cursor-pointer inline-block w-full px-5 py-3 font-semibold text-center transition-smooth uppercase ${
                    plan.highlighted
                      ? "bg-white text-zinc-600 hover:bg-gray-100"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
