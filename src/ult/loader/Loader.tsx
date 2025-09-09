import Lottie from "lottie-react";
import LoaderAnimation from "../../assets/Book loading.json"; 

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={LoaderAnimation} loop={true} className="" />
    </div>
  )
}

export default Loader