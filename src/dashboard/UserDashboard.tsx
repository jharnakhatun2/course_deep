import React, { useState } from "react";
import Hero from "./profile/Hero";
import ProfileSidebar from "./profile/ProfileSidebar";
import CourseEvent from "./profile/CourseEvent";
import { useGetCoursesQuery } from "../features/course/courseApi";
import Loader from "../ult/loader/Loader";
import { useGetUserBookingsQuery } from "../features/bookings/bookingsApi";
import { useAuth } from "../hook/useAuth";


export interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedDate: string;
}

const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "events">(
    "overview"
  );
 const { user } = useAuth();
 const userEmail = user?.email;
  const {data: courses, isLoading: courseLoading ,isError: courseError} = useGetCoursesQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
  // ✅ User Bookings Query (only if email exists)
  const {data: userBookings, isLoading: bookingLoading, isError: bookingError} = useGetUserBookingsQuery(userEmail ?? "", { skip: !userEmail });

  const eventBookings = userBookings?.filter(
  (booking) => booking.productType === "event"
);
// const courseBookings = userBookings?.filter(
//   (booking) => booking.productType === "course"
// );
    

  // Loading & Error for Data
  if (courseLoading || bookingLoading) return <Loader />;
  if (courseError || bookingError || !courses)
    return (
      <p className="text-center py-10 text-red-500">Failed to load Data!</p>
    );

    console.log(user);
  return (
    <div className="bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* User Profile */}
        <Hero courses={courses} events={eventBookings} user={user}/>

        {/* course and event info */}
        {/* Tabs */}
        <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2 pt-7">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base whitespace-nowrap border border-white shadow-sm ${
              activeTab === "overview"
                ? "bg-white text-yellow-400"
                : "bg-white/10 text-zinc-400 hover:bg-white/20 border border-white"
            }`}
          >
            Overview
          </button>
          <button
          type="button"
            onClick={() => setActiveTab("courses")}
            className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base whitespace-nowrap border border-white shadow-sm ${
              activeTab === "courses"
                ? "bg-white text-yellow-400"
                : "bg-white/10 text-zinc-400 hover:bg-white/20 "
            }`}
          >
            My Courses
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base whitespace-nowrap border border-white shadow-sm ${
              activeTab === "events"
                ? "bg-white text-yellow-400"
                : "bg-white/10 text-zinc-400 hover:bg-white/20"
            }`}
          >
            My Events
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <CourseEvent activeTab={activeTab} courses={courses} events={eventBookings} />
          {/* Sidebar */}
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
