import { IoMailSharp, IoPhonePortraitOutline } from "react-icons/io5"
import { MdOutlinePhone } from "react-icons/md"
import { TiSocialFacebook, TiSocialLinkedin, TiSocialTwitter } from "react-icons/ti"

const InstructorInfo = () => {
    const infoClass = "text-sm hover:text-yellow-400 transition-smooth";
    const socialClass = "px-2 py-1 rounded-xs transition-smooth"
  return (
    <div className="overflow-hidden">
            {/* Profile Image */}
            <div className="bg-gray-400 h-64 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" 
                alt="Lospher Cook" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Contact Info */}
            <div className="bg-zinc-800 text-zinc-400 p-8 space-y-3">
              <div className="flex items-center gap-3">
                <IoPhonePortraitOutline size={18} />
                <span className={infoClass}>+(61) 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlinePhone size={18} />
                <span className={infoClass}>+(61) 123 456 7890</span>
              </div>
              <div className="flex items-center gap-3">
                <IoMailSharp  size={18} />
                <span className={infoClass}>Example@domain.com</span>
              </div>
              <div className="h-[1px] w-full bg-gray-500/20 mt-7" />
            </div>


            {/* Social Media */}
            <div className="bg-zinc-800 px-8 pb-8 flex gap-3">
              <button className={`${socialClass} bg-blue-900 hover:bg-blue-800 `}>
                <TiSocialFacebook  size={20} className="text-white" />
              </button>
              <button className={`${socialClass} bg-blue-400 hover:bg-blue-500 `}>
                <TiSocialTwitter size={20} className="text-white" />
              </button>
              <button className={`${socialClass} bg-red-400 hover:bg-red-500 text-white text-sm font-bold`}>
                G+
              </button>
              <button className={`${socialClass} bg-blue-600 hover:bg-blue-700`}>
                <TiSocialLinkedin size={20} className="text-white" />
              </button>
            </div>
          </div>
  )
}

export default InstructorInfo