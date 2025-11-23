import { Link } from "react-router";
import type { FC } from "react";
import type { Teacher } from "../../ult/types/types";
import TeacherCard from "../../ult/cards/courseCard/TeacherCard";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";

type CourseCardProps = {
    _id: string;
    title: string;
    shortDes: string;
    ratings: number;
    time: string;
    teacher: Teacher;
    imageUrl: string;
    lessons: string;
    students: number;
    price: number;
};

const InstructorCard: FC<CourseCardProps> = ({
    _id,
    title,
    shortDes,
    imageUrl,
    lessons,
    students,
    time,
    price,
    ratings,
    teacher,
}) => {
    return (
        <div className="backdrop-blur-lg bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition w-full max-w-sm mx-auto group">

            <div className="relative overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute top-0 left-0 w-full h-0 bg-gray-100/70 flex items-center justify-center overflow-hidden group-hover:h-full transition-all duration-500">
                    <Link
                        to={`/admin/instructor-course/${_id}`}
                        className="text-sm uppercase bg-yellow-500 hover:bg-yellow-400 text-white font-semibold py-2 px-4 rounded"
                    >
                        View More
                    </Link>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between">
                    <h3 className="font-semibold mb-2">
                        {price > 0 ? (
                            <span className="bg-yellow-500 text-white px-3 py-[2px]">${price}</span>
                        ) : (
                            <span className="bg-teal-500 text-white px-3 py-[2px]">Free</span>
                        )}
                    </h3>
                    <div className="flex items-center gap-2 bg-white shadow-lg px-3">
                        <IoMdCheckmarkCircle className="cursor-pointer text-green-500 hover:text-green-400 transition-smooth" size={23} />
                        <RiDeleteBin2Line className="cursor-pointer text-red-500 hover:text-red-400 transition-smooth" size={20} />
                    </div>
                </div>

                <Link to={`/course/${_id}`}>
                    <h3 className="hover:text-yellow-500 transition font-bold mb-2 text-zinc-700 uppercase">
                        {title.slice(0, 23)}...
                    </h3>
                </Link>

                <p className="text-zinc-400 mb-2">{shortDes.slice(0, 50)}...</p>

                <div className="h-[1px] w-full bg-zinc-400/30 my-4" />

                <TeacherCard time={time} ratings={ratings} lessons={lessons} students={students} />

                <div className="h-[1px] w-full bg-zinc-400/30 my-4" />

                <div className="flex items-center gap-2">
                    <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="w-10 h-10 rounded-full border border-dashed border-yellow-600"
                    />

                    <div>
                        <h4 className="text-sm font-semibold text-zinc-400">{teacher.name}</h4>
                        <p className="text-xs text-teal-600">{teacher.profession}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;
