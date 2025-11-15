import imageIns from "../../assets/img/instructorBc.webp";
import Button from "../../ult/button/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../../hook/useAuth";

const Banner2 = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth(); // Use 'loading' here too

  const handleGetStarted = () => {
    if (user) {
      // If user is already logged in, redirect based on role
      if (user.role === "instructor") {
        navigate("/instructor-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      // If not logged in, go to login page with role preference
      navigate("/login", { 
        state: { 
          rolePreference: "instructor",
          from: "/instructor-dashboard"
        } 
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or your Loader component
  }

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
            onClick={handleGetStarted}
            className="bg-zinc-100 hover:bg-zinc-300 text-zinc-800 cursor-pointer"
          >
            {user ? "Go to Dashboard" : "Get Started Now"}
          </Button>
        </div>
        {user && (
          <p className="text-center text-gray-300 mt-2 text-sm">
            {user.role === "instructor" 
              ? "Welcome back, Instructor!" 
              : "Switch to instructor account to access instructor features"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Banner2;