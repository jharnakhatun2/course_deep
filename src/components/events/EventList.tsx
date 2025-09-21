import React from "react";
import SectionTitle from "../../ult/title/SectionTitle";
import LinkText from "../../ult/linkText/LinkText";
import type { Event } from "../../ult/types/types";
import ECard from "../../ult/cards/eventCard/ECard";

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
          <ECard
            key={event._id}
            event={event}
            index={index}
            total={events.length}
          />
        ))}
      </div>
    </div>
  );
};

export default EventList;
