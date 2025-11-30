import type { FC } from "react";
import { IoIosArrowForward } from "react-icons/io";

interface ArrowProps {
  isActive: boolean;
}

const NextBtn: FC<ArrowProps> = ({ isActive }) => {
  return (
    <p
      className={`cursor-pointer rounded-sm p-1 backdrop-blur-xl bg-white/20 border border-zinc-400 shadow-[0_0_2px_#ffffff] ${
        isActive ? "text-white" : "text-zinc-400"
      }`}
    >
      <IoIosArrowForward />
    </p>
  );
};

export default NextBtn;
