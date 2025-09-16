import React, { useState, useRef, useEffect } from "react";

const ToggleSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null); // ✅ Add type here
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "150px"); 
    }
  }, [isOpen]);

  return (
    <div className="max-w-xl mx-auto my-8">
      <div
        className="overflow-hidden relative transition-all duration-500 ease-in-out"
        style={{ height }}
      >
        <div ref={contentRef} className="p-4 bg-gray-800 text-gray-100">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada metus nec nibh hendrerit, at posuere odio malesuada.
            Phasellus tincidunt, libero nec consequat viverra, magna libero
            convallis elit, vel vestibulum elit sapien in turpis. Curabitur
            sodales turpis nec mauris efficitur, nec feugiat lorem tincidunt.
            Integer vehicula dui ac magna ultrices, non luctus erat convallis.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            malesuada metus nec nibh hendrerit, at posuere odio malesuada.
            Phasellus tincidunt, libero nec consequat viverra, magna libero
            convallis elit, vel vestibulum elit sapien in turpis. Curabitur
            sodales turpis nec mauris efficitur, nec feugiat lorem tincidunt.
            Integer vehicula dui ac magna ultrices, non luctus erat convallis.
          </p>

          {!isOpen && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-800 via-gray-800/70 to-transparent pointer-events-none"></div>
          )}
        </div>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        {isOpen ? "Show Less" : "Show More"}
      </button>
    </div>
  );
};

export default ToggleSection;
