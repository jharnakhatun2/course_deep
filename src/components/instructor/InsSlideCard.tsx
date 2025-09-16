import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";


type InstructorCardProps = {
  name: string;
  image: string;
  role: string;
  twitterProfile: string;
  facebookProfile: string;
  linkedinProfile: string;
};

const InsSlideCard: React.FC<InstructorCardProps> = ({
  name,
  image,
  role,
  twitterProfile,
  facebookProfile,
  linkedinProfile
}) => {
  return (
    <div className="backdrop-blur-lg bg-white/10 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 w-full max-w-sm mx-auto cursor-pointer group">
      <img
              src={image}
              alt={name}
              className="w-32 h-32 object-cover rounded-full border-4 border-yellow-500 mb-4"
            />
            <h4 className="text-xl font-semibold text-gray-800">{name}</h4>
            <p className="text-gray-500 mb-4">{role}</p>
      
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href={twitterProfile}
                aria-label={`${name} Twitter Profile`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-400 transition"
              >
                <FaTwitter />
              </a>
              <a
                href={facebookProfile}
                aria-label={`${name} Facebook Profile`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-400 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href={linkedinProfile}
                aria-label={`${name} LinkedIn Profile`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-400 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
    </div>
  );
};

export default InsSlideCard;
