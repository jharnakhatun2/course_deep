import { FiClock } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

type TeacherProps = {
  name: string;
  image?: string;
  profession: string;
  ratings: number;
  time: string;
};

const TeacherCard: React.FC<TeacherProps> = ({
  name,
  profession,
  image,
  ratings,
  time,
}) => {
  return (
    <div className="flex items-center gap-2 w-full">
      {/* Teacher Image as React Icon */}
      <div className="flex gap-3">
        <img src={image} alt={name} className="w-10 h-10 rounded-full border border-dashed border-yellow-600"/>

        {/* Teacher Details */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-400">{name}</h4>
          <p className="text-xs text-teal-600">{profession}</p>
        </div>
      </div>

      
    </div>
  );
};

export default TeacherCard;
