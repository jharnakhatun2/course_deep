import React from "react";
import CounterValue from "./CounterValue";

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

const BannerStats: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: 150,
      suffix: "+",
      label: "Courses",
    },
    {
      value: 30,
      suffix: "K+",
      label: "Students",
    },
    {
      value: 180,
      suffix: "+",
      label: "Instructors",
    },
    {
      value: 10,
      suffix: "K+",
      label: "Certificates",
    },
  ];

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-t from-gray-200 to-gray-400">
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="container mx-auto grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-8 rounded-sm bg-white/30 backdrop-blur-lg shadow-[0_0_5px_#ffffff]"
            >
              <p className="text-4xl font-extrabold text-gray-800">
                <CounterValue initialValue={stat.value} />
                <span>{stat.suffix}</span>
              </p>
              <p className="mt-2 text-sm font-medium text-gray-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerStats;
