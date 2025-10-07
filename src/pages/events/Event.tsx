import SocialIcon from "./SocialIcon";
import EventMap from "./EventMap";
import Tab from "./Tab";
import SingleBlogSidebar from "../../components/latestBlog/SingleBlogSidebar";
import { MdOutlineWatchLater } from "react-icons/md";
import { FaFlag } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
// import BuyTicket from "./BuyTicket";

const HEADER_IMAGE_URL =
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a2d2d5a8a0bfa0d4d3e5f7f6f1b8a6b"; // replace with your image

const Event = () => {
  const titleStyle = "text-xs uppercase text-zinc-900 font-semibold";
  const textStyle = "text-sm text-zinc-600";
  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
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
                  <div className="flex gap-2">
                    <MdOutlineWatchLater  className="text-white font-bold text-xl"/>
                    <div>
                      <div className={titleStyle}>Start Time :</div>
                      <div className={textStyle}>March 01, 2017 AT 8.00 am</div>
                    </div>
                  </div>

                  <hr className="border-gray-200 my-7" />

                  <div className="flex gap-3">
                    <FaFlag className="text-white font-bold" />
                    <div>
                      <div className={titleStyle}>Finish Time :</div>
                      <div className={textStyle}>March 01, 2017 AT 8.00 am</div>
                    </div>
                  </div>

                  <hr className="border-gray-200 my-7" />

                  <div className="flex gap-2">
                    <IoLocationSharp className="text-white font-bold text-xl" />
                    <div>
                      <div className={titleStyle}>Address:</div>
                      <div className={textStyle}>Peppard Hill, UK</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="mt-6 text-3xl md:text-4xl font-semibold text-zinc-700 ">
            WordPress Theme Development With Boostrap
          </h1>

          <div className="mt-4 text-zinc-600">
            <h3 className="text-lg font-medium mb-2">Event Description</h3>
            <p className="leading-relaxed text-sm md:text-base text-justify text-zinc-500">
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

          <div className="h-[1px] w-full bg-gray-500/20 mt-10" />

          {/* Tags + Share  */}
          <SocialIcon />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <SingleBlogSidebar />
        </aside>
      </div>
    </section>
  );
};

export default Event;
