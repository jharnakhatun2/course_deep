import { Link } from "react-router";
import BottomFooter from "./BottomFooter";
import Button from "../../ult/button/Button";
import ContactUs from "./ContactUs";

const quickLinks = [
  { label: "All Courses", href: "/" },
  { label: "Summer Sessions", href: "/" },
  { label: "Recent Exams", href: "/" },
  { label: "Professional Courses", href: "/" },
  { label: "Portfolio", href: "/" },
];

const Footer = () => {
  const headerClass =
    "font-bold tracking-wide pb-2 border-b border-zinc-600 uppercase text-sm";

  return (
    <div className="bg-zinc-800 text-zinc-500 text-md">
      <div className="px-4 pt-10 mx-auto lg:max-w-7xl">
        <div className="space-y-6 grid sm:grid-cols-4 gap-5 lg:gap-10">
          {/* First col */}
          <div className="">
            <Link to="/">
              <span className="font-garamond text-xl text-yellow-500 font-bold tracking-wide uppercase">
                Course Deep
              </span>
            </Link>
            <div className="mt-4 lg:max-w-sm">
              With 20+ years of experience, we deliver expert programming
              courses for businesses and individuals. Our instructors bring
              real-world expertise to help you master coding, project
              structuring, and building scalable applications.
            </div>
            <Button
              url="/courses"
              className="border border-zinc-500 hover:text-white hover:bg-stone-400 hover:border-stone-400 mt-4 text-[12px]"
            >
              Start Learning Now
            </Button>
          </div>
          {/* Other cols */}
          <div className="hidden sm:block">
            <p className={headerClass}>Popular Courses</p>
            <ul className="mt-2 space-y-2">
              <li>
                <a
                  href="/"
                  className="transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  World
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Games
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  References
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className={headerClass}>Quick Links</p>
            <ul className="mt-2 space-y-2 list-disc pl-5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className=" transition-colors duration-300 hover:text-zinc-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-5">
            <p className={headerClass}>Contact Us</p>
            <ContactUs />
          </div>
        </div>
        <BottomFooter />
      </div>
    </div>
  );
};

export default Footer;
