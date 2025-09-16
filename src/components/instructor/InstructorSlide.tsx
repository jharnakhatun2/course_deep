import React, { useRef } from "react";
import Slider, { type Settings } from "react-slick";
import SectionTitle from "../../ult/title/SectionTitle";
import img1 from "../../assets/img/portfolio/1.webp";
import img2 from "../../assets/img/portfolio/2.webp";
import img3 from "../../assets/img/portfolio/3.webp";
import LinkText from "../../ult/linkText/LinkText";
import PrevBtn from "../../ult/slideButton/preBtn";
import NextBtn from "../../ult/slideButton/nextBtn";
import InsSlideCard from "./InsSlideCard";


type InstructorType = {
  id: number;
  name: string;
  role: string;
  image: string;
  twitterProfile: string;
  facebookProfile: string;
  linkedinProfile: string;
};

const instructors: InstructorType[] = [
  {
    id: 1,
    name: "Parveen Anand",
    role: "Lead Designer",
    image: img1,
    twitterProfile: "https://twitter.com/javaScripLogic",
    facebookProfile: "https://www.facebook.com/jharnakhatun2/",
    linkedinProfile: "https://www.linkedin.com/in/jharna-khatun2/",
  },
  {
    id: 2,
    name: "Diana Petersen",
    role: "Lead Marketer",
    image: img2,
    twitterProfile: "https://twitter.com/javaScripLogic",
    facebookProfile: "https://www.facebook.com/jharnakhatun2/",
    linkedinProfile: "https://www.linkedin.com/in/jharna-khatun2/",
  },
  {
    id: 3,
    name: "Larry Parker",
    role: "Lead Developer",
    image: img3,
    twitterProfile: "https://twitter.com/javaScripLogic",
    facebookProfile: "https://www.facebook.com/jharnakhatun2/",
    linkedinProfile: "https://www.linkedin.com/in/jharna-khatun2/",
  },
  {
    id: 4,
    name: "Larry Parker",
    role: "Lead Developer",
    image: img3,
    twitterProfile: "https://twitter.com/javaScripLogic",
    facebookProfile: "https://www.facebook.com/jharnakhatun2/",
    linkedinProfile: "https://www.linkedin.com/in/jharna-khatun2/",
  },
];

const InstructorSlide: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);

  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // large screens
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section
      className="py-8 lg:py-12 "
      
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
            {instructors.map((instructor, index) => (
              <div key={index} className="px-2">
                {" "}
                {/* ✅ spacing between slides */}
                <InsSlideCard
                  name={instructor.name}
                  image={instructor.image}
                  role={instructor.role}
                  twitterProfile={instructor.twitterProfile}
                  facebookProfile={instructor.facebookProfile}
                  linkedinProfile={instructor.linkedinProfile}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default InstructorSlide;
