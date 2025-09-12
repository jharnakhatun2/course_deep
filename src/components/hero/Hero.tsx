import Button from "../../ult/button/Button";
import HeroSlider from "./HeroSlider";

const Hero = () => {
  return (
    <HeroSlider>
      <div className="px-2 text-center space-y-3 sm:space-y-0">
      <h1 className="capitalize text-4xl lg:text-5xl xl:text-6xl  font-bold ">Learn to Code, Build Your Future</h1>
      <h3 className="text-lg sm:text-xl lg:text-2xl font-Ubuntu font-light text-zinc-300 px-4">Master programming with hands-on courses and real projects</h3>
      <div className="flex gap-3 justify-center sm:py-5">
        <Button url="/login" className="bg-yellow-500 hover:bg-yellow-400">Sign Up</Button>
        <Button url="/courses" className="bg-zinc-100 hover:bg-zinc-300 text-zinc-800">Learn More</Button>
      </div>
      </div>
    </HeroSlider>
  );
};

export default Hero;
