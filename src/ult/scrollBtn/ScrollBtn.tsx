
import { useState, useEffect } from "react";

const ScrollBtn = () => {
  const [visible, setVisible] = useState(false);

  // Show button after user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null; // Hide button if not visible

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-yellow-400/60 hover:bg-yellow-500 text-white p-4 rounded shadow-lg backdrop-blur-lg z-50 cursor-pointer transition-smooth"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

export default ScrollBtn;
