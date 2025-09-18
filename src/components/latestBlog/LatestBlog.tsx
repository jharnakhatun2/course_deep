import React, { useRef } from "react";
import img1 from "../../assets/img/portfolio/1.webp";
import img2 from "../../assets/img/portfolio/2.webp";
import img3 from "../../assets/img/portfolio/3.webp";
import imgBg from "../../assets/img/blogBg.webp";
import SectionTitle from "../../ult/title/SectionTitle";
import type { Settings } from "react-slick";
import LinkText from "../../ult/linkText/LinkText";
import NextBtn from "../../ult/slideButton/nextBtn";
import PrevBtn from "../../ult/slideButton/preBtn";
import Slider from "react-slick";
import BlogCard from "./BlogCard";

interface BlogPost {
  id: number;
  image: string;
  category: string;
  title: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
}

// Static blog data
const blogData: BlogPost[] = [
  {
    id: 1,
    image: img1,
    category: "React",
    title: "Getting Started with React 18: A Beginner's Guide",
    content:
      "Learn the fundamentals of React 18, including hooks, component structure, and building your first app step by step.",
    author: "Jharna Khatun",
    date: "Sep 14, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    image: img2,
    category: "JavaScript",
    title: "10 Advanced JavaScript Concepts Every Developer Should Know",
    content:
      "Deep dive into closures, async/await, event loop, and other advanced JavaScript concepts to level up your coding skills.",
    author: "Samiha Rahman",
    date: "Sep 10, 2025",
    readTime: "7 min read",
  },
  {
    id: 3,
    image: img3,
    category: "Web Development",
    title: "How to Build Responsive Websites with Tailwind CSS",
    content:
      "Learn how to use Tailwind CSS utility classes to create modern, responsive websites quickly and efficiently.",
    author: "Arif Hasan",
    date: "Sep 5, 2025",
    readTime: "6 min read",
  },
  {
    id: 4,
    image: img2,
    category: "JavaScript",
    title: "10 Advanced JavaScript Concepts Every Developer Should Know",
    content:
      "Deep dive into closures, async/await, event loop, and other advanced JavaScript concepts to level up your coding skills.",
    author: "Samiha Rahman",
    date: "Sep 10, 2025",
    readTime: "7 min read",
  },
  {
    id: 5,
    image: img3,
    category: "Web Development",
    title: "How to Build Responsive Websites with Tailwind CSS",
    content:
      "Learn how to use Tailwind CSS utility classes to create modern, responsive websites quickly and efficiently.",
    author: "Arif Hasan",
    date: "Sep 5, 2025",
    readTime: "6 min read",
  },
];

const LatestBlog: React.FC = () => {
  const latestBlogs = blogData.slice(0, 4); // first 3 blogs
  const sliderRef = useRef<Slider | null>(null);

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
              <div key={post.id} className="px-4">
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
