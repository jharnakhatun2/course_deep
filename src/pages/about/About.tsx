import React from "react";
import Story from "../../components/about/Story";
import Mission from "../../components/about/Mission";
import Achievement from "../../components/about/Achievement";


const About: React.FC = () => {
 

  const teamMembers = [
    {
      name: "Dr. Elena Vasquez",
      role: "CEO & Co-Founder",
      desc: "Cognitive computing pioneer with a PhD in Computational Neuroscience from Stanford.",
      img: "https://images.unsplash.com/photo-1590086783191-a0694c7d1e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Raj Patel",
      role: "Chief Technology Officer",
      desc: "Former lead architect at DeepMind, specializes in neural-symbolic integration.",
      img: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      name: "Dr. Kwame Nkosi",
      role: "Chief Ethics Officer",
      desc: "Author of 'The Moral Algorithm' and AI policy advisor to the EU Parliament.",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  

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
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Meet Our Leadership
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-primary-500 to-secondary-600 text-white rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Experience the SynthMind Difference
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join forward-thinking organizations leveraging our cognitive AI
            platform.
          </p>
          <button className="bg-white text-primary-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg">
            Schedule a Demo
          </button>
        </section>
      </div>
    </main>
  );
};

export default About;
