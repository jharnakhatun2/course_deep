import React, { useRef } from "react";
import Slider, { type Settings } from "react-slick";
import SectionTitle from "../../ult/title/SectionTitle";
import bgImage from "../../assets/img/course-bg.webp";
import LinkText from "../../ult/linkText/LinkText";
import PrevBtn from "../../ult/slideButton/preBtn";
import NextBtn from "../../ult/slideButton/nextBtn";
import type { Course } from "../../ult/types/types";
import Card from "../../ult/cards/courseCard/Card";

interface CourseCardsProps {
  courses: Course[];
}

const CourseCards: React.FC<CourseCardsProps> = ({ courses }) => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
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

  return (
    <section
      className="py-8 lg:py-12 bg-fixed bg-cover bg-bottom relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="lg:max-w-7xl mx-auto px-4 relative z-10">
        <span className="mt-5 -mb-1 flex justify-center text-xs uppercase text-yellow-400 text-center">
          Master New Skills With Ease
        </span>
        <SectionTitle title="Popular Courses" className="text-white" />

        {/* buttons + link */}
        <div className="flex justify-between items-center">
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
            className="text-white hover:text-yellow-500"
          />
        </div>

        {/* Slider */}
        <div className="py-8">
          <Slider ref={sliderRef} {...settings}>
            {courses.map((course, index) => (
              <div key={index} className="px-2">
                {" "}
                {/* ✅ spacing between slides */}
                <Card
                  title={course.name}
                  description={course.description}
                  ratings={course.ratings}
                  time={course.time}
                  teacherName={course.teacher}
                  teacherProfession={course.teacherProfession}
                  imageUrl={course.image}
                  lessons={course.lessons}
                  students={course.studentsEnrolled}
                  price={course.price}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default CourseCards;
