import type { FC } from "react";
import { GoHome } from "react-icons/go";
import { Link } from "react-router";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-zinc-400">
      {/* Home Icon */}
      <Link to="/" className="text-zinc-400 hover:text-yellow-500 transition-smooth">
        <GoHome />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <span className="text-zinc-400">›</span>
          {item.href ? (
            <Link
              to={item.href}
              className="text-zinc-400 hover:text-yellow-500 transition-smooth"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-yellow-500">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
