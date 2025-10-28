import React, { useState } from "react";
import Hero from "./profile/Hero";
import ProfileSidebar from "./profile/ProfileSidebar";
import CourseEvent from "./profile/CourseEvent";
import { useGetCoursesQuery } from "../features/course/courseApi";
import Loader from "../ult/loader/Loader";


export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  status: "upcoming" | "ongoing" | "completed";
}

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

  const {data: courses, isLoading: courseLoading ,isError: courseError} = useGetCoursesQuery(undefined, {
      refetchOnMountOrArgChange: false,
    });
    
    console.log(courses);
  

  const events: Event[] = [
    {
      id: "1",
      title: "React Performance Workshop",
      date: "Oct 28, 2025",
      time: "2:00 PM - 4:00 PM",
      type: "Workshop",
      status: "upcoming",
    },
    {
      id: "2",
      title: "Coding Competition: Algorithm Sprint",
      date: "Oct 30, 2025",
      time: "10:00 AM - 1:00 PM",
      type: "Competition",
      status: "upcoming",
    },
    {
      id: "3",
      title: "Career Panel: Tech Industry Insights",
      date: "Nov 2, 2025",
      time: "6:00 PM - 7:30 PM",
      type: "Seminar",
      status: "upcoming",
    },
    {
      id: "4",
      title: "TypeScript Best Practices",
      date: "Oct 25, 2025",
      time: "3:00 PM - 5:00 PM",
      type: "Workshop",
      status: "completed",
    },
  ];

  // Loading & Error for Data
  if (courseLoading) return <Loader />;
  if (courseError || !courses)
    return (
      <p className="text-center py-10 text-red-500">Failed to load courses!</p>
    );

  return (
    <div className="bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* User Profile */}
        <Hero courses={courses} events={events} />

        {/* course and event info */}
        {/* Tabs */}
        <div className="flex gap-2 mb-4 md:mb-6 overflow-x-auto pb-2 pt-7">
          <button
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
          <CourseEvent activeTab={activeTab} courses={courses} events={events} />
          {/* Sidebar */}
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
