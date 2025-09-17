import React from "react";
import image1 from "../../assets/img/offer/1.webp";
import image2 from "../../assets/img/offer/2.webp";
import image3 from "../../assets/img/offer/3.webp";
import SectionTitle from "../../ult/title/SectionTitle";
import LinkText from "../../ult/linkText/LinkText";
import Button from "../../ult/button/Button";

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
    <div className="py-8 lg:py-12 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 space-y-8">
        <span className="mt-5 -mb-1 flex justify-center text-xs uppercase text-yellow-500 text-center">
          Educational events listed here
        </span>
        <SectionTitle title="Upcoming Events" className="text-zinc-600" />

        <LinkText
          to="/courses"
          text="Browse All Events"
          className="text-teal-500 hover:text-yellow-500"
        />

        {events.map((event, index) => (
          <div
            key={event.id}
            className={`flex flex-col lg:flex-row-reverse items-center justify-between gap-10 ${
              index !== events.length - 1 ? "border-b border-gray-300 pb-6" : ""
            }`}
          >
            {/* Image Section */}
            <div className="flex flex-1 justify-center lg:justify-end">
              <img
                src={event.image}
                alt={event.title}
                className="w-1/2 object-cover inline-block"
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
