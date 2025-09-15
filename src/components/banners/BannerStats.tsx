import React from "react";
import {
  FaBookOpen,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCertificate,
} from "react-icons/fa";
import CounterValue from "./CounterValue"; // import your counter

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
};

const BannerStats: React.FC = () => {
  const stats: StatItem[] = [
    {
      value: 150,
      suffix: "+",
      label: "Courses",
      icon: <FaBookOpen className="text-indigo-500 text-4xl" />,
    },
    {
      value: 30,
      suffix: "K+",
      label: "Students",
      icon: <FaUserGraduate className="text-green-500 text-4xl" />,
    },
    {
      value: 180,
      suffix: "+",
      label: "Instructors",
      icon: <FaChalkboardTeacher className="text-yellow-500 text-4xl" />,
    },
    {
      value: 10,
      suffix: "K+",
      label: "Certificates",
      icon: <FaCertificate className="text-pink-500 text-4xl" />,
    },
  ];

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-t from-gray-200 to-gray-400">
      <div className="lg:max-w-7xl mx-auto px-4">
        <div className="container mx-auto grid grid-cols-1 gap-8 text-center sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-sm bg-white/30 backdrop-blur-lg shadow-[0_0_5px_#ffffff]"
            >
              <div className="mb-4">{stat.icon}</div>
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
