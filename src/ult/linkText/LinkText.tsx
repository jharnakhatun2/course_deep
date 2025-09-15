import { Link } from "react-router";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

type LinkProps = {
  to: string;
  text: string;
  className?: string;
};

const LinkText = ({ to, text, className }: LinkProps) => {
  return (
    <div className="relative flex items-center justify-end gap-1">
      <Link
        to={to}
        className={`transition-smooth font-medium group uppercase text-sm ${className}`}
      >
        {text}
      </Link>
      <MdKeyboardDoubleArrowRight className="text-zinc-300 " />
      <span className="absolute left-0 -bottom-0.5 h-[1px] bg-zinc-300 transition-all duration-300 w-full"></span>
    </div>
  );
};

export default LinkText;
