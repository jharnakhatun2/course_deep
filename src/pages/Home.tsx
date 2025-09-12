import Category from "../components/category/Category";
import CourseCards from "../components/courses/CourseCards";
import Hero from "../components/hero/Hero";


const Home = () => {
  return (
    <>
      <Hero/>
      <Category/>
      <CourseCards/>
      <div className="lg:max-w-7xl mx-auto px-4 "></div>
    </>
  );
};

export default Home;
