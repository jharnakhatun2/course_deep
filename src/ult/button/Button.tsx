import { Link } from "react-router"; 

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  url?: string; 
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>; 
};

const Button = ({ children, className, url, onClick }: ButtonProps) => {
  const baseClass =
    "inline-block w-auto px-4 py-3 uppercase text-sm transition-smooth cursor-pointer";

  if (url) {
    return (
      <Link
        rel="noopener noreferrer"
        to={url}
        className={`${baseClass} ${className || ""}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClass} ${className || ""}`}>
      {children}
    </button>
  );
};

export default Button;

