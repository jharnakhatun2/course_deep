import { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaUserGraduate } from "react-icons/fa";
import TicketBookingModal from "./TicketBookingModal";


const CourseEventPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookNow = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Image */}
      <div className="relative w-full h-80">
        <img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b"
          alt="Course Event"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">React Masterclass 2025</h1>
        </div>
      </div>

      {/* Course Info */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Left Section */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-semibold">Course Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Join our hands-on **React Masterclass 2025** where you'll learn how to build
              scalable web applications using modern tools like React, TypeScript, and Tailwind CSS.
              This workshop is perfect for intermediate developers aiming to take their front-end
              skills to the next level.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <IoLocationSharp className="text-blue-600 text-xl" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-2">
                <MdOutlineWatchLater className="text-blue-600 text-xl" />
                <span>25th December 2025, 10:00 AM</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaUserGraduate className="text-blue-600 text-xl" />
                <span>Instructor: Jharna Khatun</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-blue-700">Seats Available: 40</span>
              </div>
            </div>

            <button
              onClick={handleBookNow}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all"
            >
              Book Your Ticket
            </button>
          </div>

          {/* Right Sidebar */}
          <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-2">Event Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li>📅 <strong>Date:</strong> December 25, 2025</li>
              <li>🕒 <strong>Time:</strong> 10:00 AM – 4:00 PM</li>
              <li>📍 <strong>Venue:</strong> Dhaka Convention Hall</li>
              <li>💵 <strong>Price:</strong> $49 / person</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Ticket Booking Modal */}
      {isModalOpen && <TicketBookingModal onClose={closeModal} />}
    </div>
  );
};

export default CourseEventPage;
