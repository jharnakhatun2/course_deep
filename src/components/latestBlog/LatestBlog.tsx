import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import imgBg from "../../assets/img/blogBg.webp";
import SectionTitle from "../../ult/title/SectionTitle";
import LinkText from "../../ult/linkText/LinkText";
import NextBtn from "../../ult/slideButton/nextBtn";
import PrevBtn from "../../ult/slideButton/preBtn";
import BlogCard from "./BlogCard";
import type { BlogPost } from "../../ult/types/types";

interface BlogsProps {
  blogs: BlogPost[];
}

const LatestBlog: React.FC<BlogsProps> = ({ blogs }) => {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  };

  // Take the first 4 blogs
  const latestBlogs: BlogPost[] = blogs.slice(0, 4);

  return (
    <section
      className="py-8 lg:py-12 bg-fixed bg-cover bg-bottom relative"
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content wrapper */}
      <div className="lg:max-w-7xl mx-auto px-4 relative z-10">
        <span className="mt-5 -mb-1 flex justify-center text-xs uppercase text-yellow-400 text-center">
          Master New Skills With Ease
        </span>
        <SectionTitle title="Latest Blogs" className="text-zinc-100 pb-8" />

        {/* Buttons + Link */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button onClick={() => swiperRef.current?.slidePrev()} disabled={activeIndex === 0}>
              <PrevBtn isActive={activeIndex !== 0} />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={activeIndex === latestBlogs.length - 1}
            >
              <NextBtn isActive={activeIndex !== latestBlogs.length - 1} />
            </button>
          </div>
          <LinkText
            to="/blogs"
            text="Browse All Blogs"
            className="text-white hover:text-yellow-500"
          />
        </div>

        {/* Swiper Slider */}
        <div className="py-8">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={3} // default for large screens
            breakpoints={{
              0: { slidesPerView: 1 },
              480: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3 },
            }}
            className="mySwiper"
          >
            {latestBlogs.map((post) => (
              <SwiperSlide key={post._id}>
                <BlogCard {...post} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;
