import Lottie from "lottie-react";
import LoaderAnimation from "../../assets/Book loading.json";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={LoaderAnimation} loop={true} className="w-40" />
    </div>
  );
};

export default Loader;
