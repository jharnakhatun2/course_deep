import { IoIosArrowForward } from "react-icons/io";
import type { CustomArrowProps } from "react-slick";

const NextBtn: React.FC<CustomArrowProps> = () => {
  return (
    <p className="cursor-pointer text-zinc-500 rounded-sm p-1 backdrop-blur-xl bg-white/10 border border-zinc-400">
      <IoIosArrowForward />
    </p>
  );
};

export default NextBtn;
