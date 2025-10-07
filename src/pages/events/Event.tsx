import SocialIcon from "./SocialIcon";
import EventMap from "./EventMap";
import Tab from "./Tab";
// import BuyTicket from "./BuyTicket";

const HEADER_IMAGE_URL =
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a2d2d5a8a0bfa0d4d3e5f7f6f1b8a6b"; // replace with your image

const Event = () => {
  return (
    <main className="max-w-6xl mx-auto p-6 lg:p-12">
      {/* Header with image + right-side info card */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <div className="relative overflow-hidden shadow">
            <img
              src={HEADER_IMAGE_URL}
              alt="Event header"
              className="w-full h-64 sm:h-96 object-cover"
            />
            {/* white overlay bottom to match design */}
            <div className="absolute top-0 right-0 hidden lg:block h-full">
  <div className="h-full flex items-center">
    <div className="bg-yellow-400 p-6 shadow text-sm text-gray-800 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M12 8v4l3 3"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <div className="text-xs uppercase">Start Time :</div>
          <div className="text-sm">March 01, 2017 AT 8.00 am</div>
        </div>
      </div>

      <hr className="border-gray-200 my-2" />

      <div className="flex items-center gap-3 mb-4">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M3 12h18"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <div className="text-xs uppercase">Finish Time :</div>
          <div className="text-sm">March 01, 2017 AT 8.00 am</div>
        </div>
      </div>

      <hr className="border-gray-200 my-2" />

      <div className="flex items-center gap-3">
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1118 0z"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div>
          <div className="text-xs uppercase">Address:</div>
          <div className="text-sm">Peppard Hill, UK</div>
        </div>
      </div>
    </div>
  </div>
</div>

          </div>

          <h1 className="mt-6 text-3xl md:text-4xl font-semibold">
            WordPress Theme Development With Boostrap
          </h1>

          <div className="mt-4 text-gray-700">
            <h3 className="font-medium mb-2">Event Description</h3>
            <p className="leading-relaxed text-sm md:text-base">
              Numbers say it all. Globally, progress in the wind sector
              continues to be strong with increasing annual installed capacity
              and growing investment in the sector. In 2015 alone, 63,013
              megawatts of wind power capacity was installed globally an annual
              market growth of 22 percent. It is continuing its progress towards
              becoming a mainstream, competitive and reliable power source in
              both developing and mature markets. In fact, wind is becoming
              cheap enough in many places in the U.S. and around the world to
              compete effectively with fossil fuels.
            </p>
          </div>

          {/* Countdown + Buy button */}
          {/* <BuyTicket /> */}

          {/* Event Content / Tabs */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Event Content</h3>
            <Tab />
          </div>

          {/* Map embed */}
          <EventMap />

          {/* Tags + Share  */}
          <SocialIcon />
        </div>

        {/* Right-side sticky info card */}
      </section>
    </main>
  );
};

export default Event;
