import team1 from "../../assets/img/team/team1.webp";
import team2 from "../../assets/img/team/team2.webp";
import team3 from "../../assets/img/team/team3.webp";
import team4 from "../../assets/img/team/team4.webp";
import team5 from "../../assets/img/team/team5.webp";
import team6 from "../../assets/img/team/team6.webp";
import team7 from "../../assets/img/team/team7.webp";
import team8 from "../../assets/img/team/team8.webp";

const teamMembers = [
  { id: 1, name: "John Doe", role: "Software Engineer", image: team1 },
  { id: 2, name: "Jane Smith", role: "Graphic Designer", image: team2 },
  { id: 3, name: "Alex Johnson", role: "Marketing Manager", image: team3 },
  { id: 4, name: "Peter Johnson", role: "SEO Specialist", image: team4 },
  { id: 5, name: "Emily Brown", role: "UX Designer", image: team5 },
  { id: 6, name: "Michael Davis", role: "Frontend Developer", image: team6 },
  { id: 7, name: "Sarah Johnson", role: "Content Writer", image: team7 },
  { id: 8, name: "David Wilson", role: "Project Manager", image: team8 },
];

const Team = () => {
  return (
    <section className="pb-8 pt-10">
      <div className="text-center mb-7">
        <span className="text-xs uppercase text-teal-500 tracking-wider">
          Behind every success
        </span>
        <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-zinc-600 uppercase">
          Our Team
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="relative group overflow-hidden rounded-lg shadow-md"
          >
            {/* Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-yellow-400/60 flex flex-col items-center justify-center 
              translate-y-full group-hover:translate-y-0 transition-smooth"
            >
              <div className="border border-white p-4 text-center">
                <h4 className="text-zinc-800 font-semibold text-lg uppercase">
                  {member.name}
                </h4>
                <p className="text-white text-sm">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
