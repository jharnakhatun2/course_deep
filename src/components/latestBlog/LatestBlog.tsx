import React, { useRef } from "react";
import imgBg from "../../assets/img/blogBg.webp";
import SectionTitle from "../../ult/title/SectionTitle";
import type { Settings } from "react-slick";
import LinkText from "../../ult/linkText/LinkText";
import NextBtn from "../../ult/slideButton/nextBtn";
import PrevBtn from "../../ult/slideButton/preBtn";
import Slider from "react-slick";
import BlogCard from "./BlogCard";
import type { BlogPost } from "../../ult/types/types";
import { useGetBlogsQuery } from "../../features/blog/blogApi";
import Loader from "../../ult/loader/Loader";



const LatestBlog: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const { data: blogs = [], isLoading, isError } = useGetBlogsQuery();

  // blogs is BlogPost[]
  const latestBlogs: BlogPost[] = blogs.slice(0, 4);

  // Settings for slider
  const settings: Settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
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

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Failed to load blogs</p>;

  return (
    <section
      className="py-8 lg:py-12 bg-fixed bg-cover bg-bottom relative"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content wrapper with higher z-index */}
      <div className="lg:max-w-7xl mx-auto px-4 relative z-10">
        <span className="mt-5 -mb-1 flex justify-center text-xs uppercase text-yellow-400 text-center">
          Master New Skills With Ease
        </span>
        <SectionTitle title="Latest Blogs" className="text-zinc-100 pb-8" />

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
            {latestBlogs.map((post) => (
              <div key={post._id} className="px-4">
                <BlogCard {...post} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
