import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";

import SectionTitle from "../../../ult/title/SectionTitle";
import bgImage from "../../../assets/img/course-bg.webp";
import LinkText from "../../../ult/linkText/LinkText";
import PrevBtn from "../../../ult/slideButton/preBtn";
import NextBtn from "../../../ult/slideButton/nextBtn";
import type { Course } from "../../../ult/types/types";
import Card from "../../../ult/cards/courseCard/Card";

interface CourseCardsProps {
  courses: Course[];
}

const CourseCards: React.FC<CourseCardsProps> = ({ courses }) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  const slidesPerView = Number(swiperRef.current?.params.slidesPerView) || 1;

  return (
    <section
      className="py-8 lg:py-12 bg-scroll lg:bg-fixed bg-cover bg-bottom relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="w-full lg:max-w-7xl mx-auto px-4 relative z-10">
        <span className="mt-5 -mb-1 flex justify-center text-xs uppercase text-yellow-400 text-center">
          Master New Skills With Ease
        </span>
        <SectionTitle title="Popular Courses" className="text-white" />

        {/* buttons + link */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={activeIndex === 0}
            >
              <PrevBtn isActive={activeIndex !== 0} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={activeIndex >= courses.length - slidesPerView}
            >
              <NextBtn
                isActive={activeIndex < courses.length - slidesPerView}
              />
            </button>
          </div>

          <LinkText
            to="/courses"
            text="Browse All Courses"
            className="text-white hover:text-yellow-500"
          />
        </div>

        {/* Swiper Slider */}
        <div className="w-full py-8">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={4} // default for large screens
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
              1440: {
                slidesPerView: 4,
              },
              2560: {
                slidesPerView: 4,
              },
            }}
            className="mySwiper"
          >
            {courses.map((course) => (
              <SwiperSlide key={course._id}>
                <Card
                  _id={course._id}
                  title={course.name}
                  shortDes={course.shortDes}
                  ratings={course.ratings}
                  time={course.time}
                  teacher={course.teacher}
                  imageUrl={course.image}
                  lessons={course.lessons}
                  students={course.studentsEnrolled}
                  price={course.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default CourseCards;
