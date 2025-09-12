import Category from "../components/category/Category";
import Hero from "../components/hero/Hero";


const Home = () => {
  return (
    <>
      <Hero/>
      <Category/>
      <div className="lg:max-w-7xl mx-auto px-4 "></div>
    </>
  );
};

export default Home;
