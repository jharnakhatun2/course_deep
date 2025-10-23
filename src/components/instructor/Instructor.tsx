import { useRef, type FC } from "react";
import SectionTitle from "../../ult/title/SectionTitle";
import type { Settings } from "react-slick";
import LinkText from "../../ult/linkText/LinkText";
import NextBtn from "../../ult/slideButton/nextBtn";
import PrevBtn from "../../ult/slideButton/preBtn";
import Slider from "react-slick";
import InstructorCard from "./InstructorCard";
import type { Course, Teacher } from "../../ult/types/types";

interface CourseCardsProps {
  courses: Course[];
}

const Instructor: FC<CourseCardsProps> = ({ courses }) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1172,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const uniqueTeachers: Teacher[] = Array.from(
    new Map(courses.map((c) => [c.teacher.name, c.teacher])).values()
  );

  return (
    <section className="py-8 lg:py-12 bg-gradient-to-b from-gray-200 to-zinc-500">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <span className="mt-5 -mb-1 flex justify-center text-xs uppercase text-gray-500 text-center">
          Master New Skills With Ease
        </span>
        <SectionTitle title="Best Instructors" className="text-zinc-700" />

        {/* buttons + link */}
        <div className="flex justify-between items-center pt-10">
          <div className="flex gap-2">
            <button onClick={() => sliderRef.current?.slickPrev()}>
              <PrevBtn />
            </button>
            <button onClick={() => sliderRef.current?.slickNext()}>
              <NextBtn />
            </button>
          </div>
          <LinkText
            to="/courses"
            text="Browse All Courses"
            className="text-white hover:text-teal-300"
          />
        </div>

        {/* Slider */}
        <div className="py-8 mt-4">
          <Slider ref={sliderRef} {...settings}>
            {uniqueTeachers.map((teacher, index) => (
              <div key={index} className="px-8">
                <InstructorCard
                  name={teacher.name}
                  image={teacher.image || ""}
                  profession={teacher.profession}
                  twitter={teacher.socialLinks?.twitter}
                  linkedin={teacher.socialLinks?.linkedin}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Instructor;
