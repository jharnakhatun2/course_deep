import React, { useRef } from "react";
import Slider, { type Settings } from "react-slick";

import SectionTitle from "../../ult/title/SectionTitle";
import Card from "./Card";
import bgImage from "../../assets/img/course-bg.webp";
import img1 from "../../assets/img/portfolio/1.webp";
import img2 from "../../assets/img/portfolio/2.webp";
import img3 from "../../assets/img/portfolio/3.webp";
import img4 from "../../assets/img/portfolio/4.webp";
import LinkText from "../../ult/linkText/LinkText";
import PrevBtn from "../../ult/slideButton/preBtn";
import NextBtn from "../../ult/slideButton/nextBtn";

type Course = {
  title: string;
  description: string;
  imageUrl: string;
  lessons: number;
  students: number;
  price: number;
  time: string;
  teacherName: string;
  teacherProfession: string;
  rating: number;
};

const courses: Course[] = [
  {
    title: "Node.js & Express",
    description: "Build scalable backend APIs with Node.js and Express.",
    imageUrl: img3,
    lessons: 18,
    students: 950,
    price: 25.0,
    time: "5 hours",
    teacherName: "Abul Kolim",
    teacherProfession: "Instructor",
    rating: 5,
  },
  {
    title: "React for Beginners",
    description: "Learn the fundamentals of React and build dynamic web apps.",
    imageUrl: img1,
    lessons: 20,
    students: 1200,
    price: 25.0,
    time: "5 hours",
    teacherName: "Abul Kolim",
    teacherProfession: "Instructor",
    rating: 5,
  },
  {
    title: "Tailwind CSS Mastery",
    description: "Master utility-first styling and build modern UI faster.",
    imageUrl: img2,
    lessons: 15,
    students: 850,
    price: 25.0,
    time: "5 hours",
    teacherName: "Abul Kolim",
    teacherProfession: "Instructor",
    rating: 5,
  },
  {
    title: "Node.js & Express",
    description: "Build scalable backend APIs with Node.js and Express.",
    imageUrl: img3,
    lessons: 18,
    students: 950,
    price: 25.0,
    time: "5 hours",
    teacherName: "Abul Kolim",
    teacherProfession: "Instructor",
    rating: 5,
  },
  {
    title: "Full Stack MERN",
    description: "Learn MongoDB, Express, React, and Node for full-stack apps.",
    imageUrl: img4,
    lessons: 25,
    students: 1500,
    price: 25.0,
    time: "5 hours",
    teacherName: "Abul Kolim",
    teacherProfession: "Instructor",
    rating: 5,
  },
];

const CourseCards: React.FC = () => {
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
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section
      className="py-8 lg:py-12 bg-fixed bg-cover bg-bottom relative"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

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
                  title={course.title}
                  description={course.description}
                  rating={course.rating}
                  time={course.time}
                  teacherName={course.teacherName}
                  teacherProfession={course.teacherProfession}
                  imageUrl={course.imageUrl}
                  lessons={course.lessons}
                  students={course.students}
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
