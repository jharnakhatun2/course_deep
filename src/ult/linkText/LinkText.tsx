import { Link } from "react-router";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

type LinkProps = {
  to: string;
  text: string;
};

const LinkText = ({ to, text }: LinkProps) => {
  return (
    <div className="relative flex items-center gap-1">
      <Link
        to={to}
        className=" text-zinc-500 hover:text-teal-500 font-medium group uppercase text-sm"
      >
        {text}
      </Link>
      <MdKeyboardDoubleArrowRight className="text-zinc-500 " />
      <span className="absolute left-0 -bottom-0.5 h-[1px] bg-zinc-400 transition-all duration-300 w-full"></span>
    </div>
  );
};

export default LinkText;
