import React from "react";
import SectionTitle from "../../ult/title/SectionTitle";
import LinkText from "../../ult/linkText/LinkText";
import Button from "../../ult/button/Button";
import type { Event } from "../../ult/types/types";

interface EventProps {
  events: Event[];
}

const EventList: React.FC<EventProps> = ({ events }) => {
  // Sort by lastUpdated (or any date field) and pick only latest 3
  const latestEvents = [...(events || [])]
    .sort((a, b) => new Date(b.day).getTime() - new Date(a.day).getTime())
    .slice(0, 3);
  return (
    <div className="py-8 lg:py-12 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 space-y-8">
        <span className="mt-5 -mb-1 flex justify-center text-xs uppercase text-yellow-500 text-center">
          Educational events listed here
        </span>
        <SectionTitle title="Upcoming Events" className="text-zinc-600" />

        <LinkText
          to="/events"
          text="Browse All Events"
          className="text-teal-500 hover:text-yellow-500"
        />

        {latestEvents?.map((event, index) => (
          <div
            key={event._id}
            className={`flex flex-col lg:flex-row-reverse items-center justify-between gap-10 ${
              index !== latestEvents?.length - 1
                ? "border-b border-gray-300 pb-6"
                : ""
            }`}
          >
            {/* Image Section */}
            <div className="flex flex-1 justify-center lg:justify-end">
              <img
                src={event.image}
                alt={event.title}
                className="w-full object-cover inline-block border border-white/90"
              />
            </div>
            <div className="lg:flex items-center flex-3">
              {/* Date Section */}
              <div className="flex-1 text-left">
                <div className="flex items-baseline-last">
                  <div className="text-5xl text-yellow-500">{event.day}</div>
                  <div className="uppercase text-gray-400 font-light">
                    {event.month}
                  </div>
                </div>
                <div className="uppercase text-2xl text-zinc-400 font-light">
                  {event.weekday}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-2 text-left ">
                <h3 className="w-full text-xl text-zinc-800 font-poppins py-3 lg:py-1">
                  {event.title}
                </h3>
                <p className="text-zinc-500">
                  {event.time} | {event.location}
                </p>
                <Button
                  url="/login"
                  className="mt-5 w-full sm:w-1/4 text-center bg-zinc-100 hover:bg-zinc-300 text-zinc-800 hover:text-white border border-gray-300"
                >
                  REGISTER
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
