import type { FC } from "react";
import { IoMailSharp, IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
} from "react-icons/ti";
import type { Teacher } from "../../ult/types/types";

interface InstructorProfileProps {
  teacher: Teacher;
}

const InstructorInfo: FC<InstructorProfileProps> = ({ teacher }) => {
  const infoClass = "text-sm hover:text-yellow-400 transition-smooth";
  const socialClass = "px-[9.7px] py-1.5 rounded-xs transition-smooth";

  return (
    <div className="overflow-hidden">
      {/* Profile Image */}
      <div className="h-72 flex items-center justify-center">
        <img
          src={teacher.image}
          alt={teacher.name}
          className="w-full h-full object-cover border border-gray-200"
        />
      </div>

      {/* Contact Info */}
      <div className="bg-zinc-800 text-zinc-400 p-8 space-y-3">
        <div className="flex items-center gap-3">
          <IoPhonePortraitOutline size={18} />
          <span className={infoClass}>{teacher.contact?.mobile}</span>
        </div>
        <div className="flex items-center gap-3">
          <MdOutlinePhone size={18} />
          <span className={infoClass}>{teacher.contact?.phone}</span>
        </div>
        <div className="flex items-center gap-3">
          <IoMailSharp size={18} />
          <span className={infoClass}>{teacher.contact?.email}</span>
        </div>
        <div className="h-[1px] w-full bg-gray-500/20 mt-7" />
      </div>

      {/* Social Media */}
      <div className="bg-zinc-800 px-8 pb-8 flex gap-3">
        <a
          href={teacher.socialLinks?.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={`${socialClass} bg-blue-900 hover:bg-blue-800`}
        >
          <TiSocialFacebook size={20} className="text-white" />
        </a>
        <a
          href={teacher.socialLinks?.twitter}
          target="_blank"
          className={`${socialClass} bg-blue-400 hover:bg-blue-500 `}
        >
          <TiSocialTwitter size={20} className="text-white" />
        </a>
        <a
          href={teacher.socialLinks?.googlePlus}
          target="_blank"
          className={`${socialClass} bg-red-400 hover:bg-red-500 text-white text-sm font-bold`}
        >
          G+
        </a>
        <a
          href={teacher.socialLinks?.linkedin}
          target="_blank"
          className={`${socialClass} bg-blue-600 hover:bg-blue-700`}
        >
          <TiSocialLinkedin size={20} className="text-white" />
        </a>
      </div>
    </div>
  );
};

export default InstructorInfo;
