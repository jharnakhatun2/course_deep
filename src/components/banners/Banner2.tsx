import imageIns from "../../assets/img/instructorBc.webp";
import Button from "../../ult/button/Button";

const Banner2 = () => {
  return (
    <div
      className="w-full bg-center bg-cover relative"
      style={{ backgroundImage: `url(${imageIns})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex flex-col flex-wrap content-center justify-center p-4 py-20 lg:py-22 mx-auto md:p-10">
        <h1 className="text-4xl lg:text-5xl font-semibold leading-none text-center text-white">
          Become an <span className="text-yellow-500">Instructor?</span>
        </h1>
        <p className="text-xl text-center text-gray-200 pb-2">
          Join thousand of instructors and earn money hassle free!
        </p>
        <div className="flex justify-center">
          <Button
            url="/courses"
            className="bg-zinc-100 hover:bg-zinc-300 text-zinc-800"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner2;
