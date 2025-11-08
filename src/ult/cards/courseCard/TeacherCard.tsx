import { FiBookOpen, FiClock } from "react-icons/fi";
import { FaStar, FaUsers } from "react-icons/fa";

type TeacherProps = {
  lessons: string;
  students: number;
  ratings: number;
  time: string;
};

const TeacherCard: React.FC<TeacherProps> = ({
  lessons,
  students,
  ratings,
  time,
}) => {
  return (
    <div>
      {/* Info row with icons */}
      <div className="flex justify-between text-zinc-400 text-sm pt-1">
        <span className="flex items-center gap-1">
          <FiBookOpen className="text-teal-500" />{" "}
          <span className="font-bold text-zinc-500">{lessons}</span> Lessons
        </span>
        <span className="flex items-center gap-1">
          <FaUsers className="text-teal-500" />{" "}
          <span className="font-bold text-zinc-500">{students}</span> Students
        </span>
      </div>

      {/* Info row with icons */}
      <div className="flex justify-between text-zinc-400 text-sm pt-1">
        {/* course duration */}
        <p className="flex items-center gap-1">
          <FiClock className="text-teal-500" />{" "}
          <span className="text-zinc-600">{time}</span>
        </p>
        {/* course ratings */}
        <div className="flex items-center gap-1 ml-auto">
          {Array.from({ length: 1 }).map((_, i) => (
            <FaStar
              key={i}
              className={`w-4 h-4 ${i < Math.round(ratings) ? "text-yellow-500" : "text-zinc-500"
                }`}
            />
          ))}
          <span className="text-sm text-zinc-400">
            (<span className="font-bold text-zinc-500">{ratings}</span> ratings)
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
