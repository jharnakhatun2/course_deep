import { useRef, useState, type FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import SectionTitle from "../../ult/title/SectionTitle";
import LinkText from "../../ult/linkText/LinkText";
import NextBtn from "../../ult/slideButton/nextBtn";
import PrevBtn from "../../ult/slideButton/preBtn";
import InstructorCard from "./InstructorCard";
import type { Course, Teacher } from "../../ult/types/types";

interface CourseCardsProps {
  courses: Course[];
}

const Instructor: FC<CourseCardsProps> = ({ courses }) => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  // Extract unique teachers
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

        {/* Buttons + Link */}
        <div className="flex justify-between items-center pt-10">
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={activeIndex === 0}
            >
              <PrevBtn isActive={activeIndex !== 0} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={activeIndex >= uniqueTeachers.length - 1}
            >
              <NextBtn isActive={activeIndex < uniqueTeachers.length - 1} />
            </button>
          </div>

          <LinkText
            to="/courses"
            text="Browse All Courses"
            className="text-white hover:text-teal-300"
          />
        </div>

        {/* Swiper Slider */}
        <div className="py-8 mt-4">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={4} // default for large screens
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1,
              },
              769: {
                slidesPerView: 2,
              },
              1172: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className="mySwiper"
          >
            {uniqueTeachers.map((teacher, index) => (
              <SwiperSlide key={index}>
                <InstructorCard
                  name={teacher.name}
                  image={teacher.image || ""}
                  profession={teacher.profession}
                  twitter={teacher.socialLinks?.twitter}
                  linkedin={teacher.socialLinks?.linkedin}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Instructor;
