import Banner1 from "../components/banners/Banner1";
import Banner2 from "../components/banners/Banner2";
import BannerStats from "../components/banners/BannerStats";
import Category from "../components/category/Category";
import CourseCards from "../components/courses/CourseCards";
import EventList from "../components/events/EventList";
import FAQ from "../components/faq/FAQ";
import Hero from "../components/hero/Hero";
import Instructor from "../components/instructor/Instructor";
import LatestBlog from "../components/latestBlog/LatestBlog";
import Pricing from "../components/pricing/Pricing";
import Testimonials from "../components/testimonial/Testimonial";


const Home = () => {
  return (
    <>
      <Hero/>
      <BannerStats/>
      <Category/>
      <CourseCards/>
      
      <EventList/>     
      <Instructor/>
      <Banner2/>
      <Testimonials/>
      <LatestBlog/>
      <Pricing/>
      <FAQ/>
      <Banner1/>
      
      
      <div className="lg:max-w-7xl mx-auto px-4 "></div>
    </>
  );
};

export default Home;
