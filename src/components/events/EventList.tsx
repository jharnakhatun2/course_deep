import React from "react";
import image1 from "../../assets/img/offer/1.webp";
import image2 from "../../assets/img/offer/2.webp";
import image3 from "../../assets/img/offer/3.webp";
import image4 from "../../assets/img/offer/4.webp";

type Event = {
  id: number;
  day: string;
  month: string;
  weekday: string;
  title: string;
  time: string;
  location: string;
  image: string;
};

const events: Event[] = [
  {
    id: 1,
    day: "01",
    month: "MARCH",
    weekday: "WEDNESDAY",
    title: "WordPress Theme Development with Bootstrap",
    time: "8:00 am - 5:00 pm",
    location: "Great Russell Street, WC1B 3DG UK",
    image: image1,
  },
  {
    id: 2,
    day: "05",
    month: "MARCH",
    weekday: "SATURDAY",
    title: "Build Apps with React Native",
    time: "12:00 pm - 5:00 pm",
    location: "No1 Warehouse London, UK",
    image: image2,
  },
  {
    id: 3,
    day: "13",
    month: "MARCH",
    weekday: "THURSDAY",
    title: "Free Yoga & Exercise Class at Every Morning",
    time: "4:00 pm - 8:00 pm",
    location: "21 New Globe Walk London, UK",
    image: image3,
  },
];

const EventList: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="space-y-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col md:flex-row items-center justify-between border-b pb-6 gap-6"
          >
            {/* Date Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="text-4xl font-bold text-yellow-500">
                {event.day}
              </div>
              <div className="uppercase text-sm text-gray-500 tracking-wide">
                {event.month}
              </div>
              <div className="uppercase text-sm font-semibold text-gray-600">
                {event.weekday}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex-2 text-center md:text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600">
                {event.time} | {event.location}
              </p>
              <button className="mt-3 px-4 py-2 border border-gray-400 text-sm font-medium rounded hover:bg-gray-100 transition">
                REGISTER
              </button>
            </div>

            {/* Image Section */}
            <div className="w-full md:w-50 h-28 flex-shrink-0">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
