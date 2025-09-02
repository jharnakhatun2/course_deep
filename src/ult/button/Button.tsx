import { Link } from "react-router"; 

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  url?: string; 
};

const Button = ({ children, className, url }: ButtonProps) => {
  const baseClass =
    "inline-block w-auto px-4 py-3 uppercase text-sm rounded transition-all duration-600 ease-in-out cursor-pointer";

  if (url) {
    return (
      <Link
        rel="noopener noreferrer"
        to={url}
        className={`${baseClass} ${className || ""}`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={`${baseClass} ${className || ""}`}>
      {children}
    </button>
  );
};

export default Button;

