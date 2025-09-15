import { FiClock } from "react-icons/fi";
import { FaStar, FaUserTie } from "react-icons/fa";

type TeacherProps = {
  name: string;
  profession: string;
  rating: number;
  time: string;
};

const TeacherCard: React.FC<TeacherProps> = ({
  name,
  profession,
  rating,
  time,
}) => {
  return (
    <div className="flex items-center gap-3 w-full">
      {/* Teacher Image as React Icon */}
      <div className="flex gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
          <FaUserTie  className="w-6 h-6 text-gray-600" />
        </div>

        {/* Teacher Details */}
        <div>
          <h4 className="text-sm font-semibold text-zinc-400">{name}</h4>
          <p className="text-xs text-teal-600">{profession}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="items-center gap-1 ml-auto">
        <p className="flex items-center gap-1">
          <FiClock className="text-teal-500" />{" "}
          <span className="font-bold text-white">{time}</span>
        </p>
        <div className="flex items-center gap-1 ml-auto">
          {Array.from({ length: 1 }).map((_, i) => (
            <FaStar
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(rating) ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-zinc-400">
            (<span className="font-bold text-white">{rating}</span> ratings)
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
