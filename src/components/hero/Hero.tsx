import Button from "../../ult/button/Button";
import HeroSlider from "./HeroSlider";

const Hero = () => {
  return (
    <HeroSlider>
      <div className="px-2 text-center space-y-3 sm:space-y-1">
        <h1 className="capitalize text-4xl lg:text-5xl xl:text-6xl  font-bold ">
          Learn to Code, Build Your Future
        </h1>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-Ubuntu font-light text-zinc-300 px-4">
          Master programming with hands-on courses and real projects
        </h3>
        <p className="text-gray-300">
          <span className="text-teal-500 font-bold">300,000+</span> Students,{" "}
          <span className="text-white underline font-bold">180</span>{" "}
          Instructors , <span className="text-yellow-500 font-bold">150</span>{" "}
          Courses, <span className="text-teal-500 font-bold">1million</span>{" "}
          hours of Teaching
        </p>
        <div className="flex gap-3 justify-center sm:py-5">
          <Button
            url="/login"
            className="bg-yellow-500 hover:bg-yellow-400 shadow-[0_0_15px_rgba(255,221,51,0.3)]
 hover:shadow-[0_0_25px_rgba(255,221,51,0.5)] border border-yellow-400"
          >
            Start Learning Now
          </Button>
          <Button
            url="/courses"
            className="bg-zinc-100 hover:bg-zinc-300 text-zinc-800"
          >
            Browse Courses
          </Button>
        </div>
      </div>
    </HeroSlider>
  );
};

export default Hero;
