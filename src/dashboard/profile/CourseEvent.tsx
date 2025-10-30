import { IoIosCode } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import type { FC } from "react";
import type { Booking, Course } from "../../ult/types/types";
import CourseCardUser from "./CourseCardUser";
import EventCardUser from "./EventCardUser";
import { useGetEventsQuery } from "../../features/event/eventApi";
import UpcomingEvent from "./UpcomingEvent";


interface CourseEventProps {
  courses: Course[];
  events?: Booking[];
  activeTab: "overview" | "courses" | "events";
  onTicketDownload: (event: Booking) => void;
  userEmail?: string;
}

const CourseEvent: FC<CourseEventProps> = ({ courses, events, activeTab, onTicketDownload }) => {
  const { data: allEvents } = useGetEventsQuery();
  

 

  return (
    <div className="lg:col-span-2">
      {activeTab === "overview" && (
        <div className="space-y-4 md:space-y-6">
          <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-white">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-500 mb-3 sm:mb-4 flex items-center gap-2">
              <IoIosCode className="w-5 h-5 sm:w-6 sm:h-6" />
              Continue Learning
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {courses.slice(0, 2).map((course) => (
                <CourseCardUser key={course._id} course={course} />
              ))}
            </div>
          </div>

          <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-white">
            <h2 className="text-lg sm:text-xl font-bold text-zinc-500 mb-3 sm:mb-4 flex items-center gap-2">
              <SlCalender className="w-5 h-5 sm:w-6 sm:h-6" />
              Upcoming Events
            </h2>
            <div className="space-y-3">
              {allEvents
                ?.filter((e) => e.status === "upcoming")
                .slice(0, 3)
                .map((event) => (
                  <UpcomingEvent key={event._id} event={event} />
                ))}
            </div>
          </div>
        </div>
      )}
      {/* My Courses Card */}
      {activeTab === "courses" && (
        <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-white">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-500 mb-3 sm:mb-4">
            All Courses
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {courses && courses.length > 0 ? (
              courses.map((course) => (
                <CourseCardUser key={course._id} course={course} />
              ))
            ) : (
              <p className="text-zinc-400 text-center py-4">
                No courses enrolled yet.
              </p>
            )}
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="bg-gray-200 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-white">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-500 mb-3 sm:mb-4">
            All Events
          </h2>
          <div className="space-y-3">
            {events && events.length > 0 ? (
              events.map((event) => (
                <EventCardUser key={event._id} event={event} onTicketDownload={onTicketDownload}/>
              ))
            ) : (
              <p className="text-zinc-400 text-center py-4">
                No events booked yet.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseEvent;
