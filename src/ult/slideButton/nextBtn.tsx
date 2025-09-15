import { IoIosArrowForward } from "react-icons/io";
import type { CustomArrowProps } from "react-slick";

const NextBtn: React.FC<CustomArrowProps> = () => {
  return (
    <p className="cursor-pointer text-zinc-400 rounded-sm p-1 backdrop-blur-xl bg-white/20 border border-zinc-400 shadow-[0_0_2px_#ffffff]">
      <IoIosArrowForward />
    </p>
  );
};

export default NextBtn;
