import React from "react";
import Story from "../../components/about/Story";
import Mission from "../../components/about/Mission";
import Achievement from "../../components/about/Achievement";
import Team from "../../components/about/Team";


const About: React.FC = () => {
   

  return (
    <main className=" bg-gradient-to-b from-gray-50 to-gray-300">
      <div className="lg:max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Our Story */}
        <Story />
        
        {/* Achievements */}
        <Achievement />

        {/* Our Mission */}
        <Mission />

        {/* Our Team */}
        <Team/>
      </div>
    </main>
  );
};

export default About;
