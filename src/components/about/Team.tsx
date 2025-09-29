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

const Team = () => {
  return (
    <section className="pb-8 pt-10">
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
              <p className="text-primary-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600">{member.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
