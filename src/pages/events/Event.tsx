import SocialIcon from "../../components/events/SocialIcon";
import EventMap from "../../components/events/EventMap";
import Tab from "../../components/events/Tab";
import SingleBlogSidebar from "../../components/latestBlog/SingleBlogSidebar";
import { IoLocationSharp } from "react-icons/io5";
import BuyTicket from "../../components/events/BuyTicket";
import { useParams } from "react-router";
import { useGetEventByIdQuery } from "../../features/event/eventApi";
import Loader from "../../ult/loader/Loader";
import Breadcrumb from "../../ult/breadcrumb/Breadcrumb";

 const breadcrumbItems = [
    { label: "Events", href: "/events" },
    { label: "Event" },
  ];

const Event = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: event,
    isLoading,
    isError,
    refetch
  } = useGetEventByIdQuery(id!, {
    skip: !id,
  });

  const titleStyle = "text-xs uppercase text-zinc-900 font-semibold mb-1";
  const textStyle = "text-sm text-zinc-600";

  if (!id || isLoading) return <Loader />;
  if (isError || !event)
    return <p className="text-center py-10 text-red-500">Event not found!</p>;

  return (
    <section className="py-10 bg-gray-100">
      <div className="lg:max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          <Breadcrumb items={breadcrumbItems} />
          <div className="relative overflow-hidden shadow mt-1">
            <img
              src={event.image}
              alt="Event header"
              className="w-full h-64 sm:h-96 object-cover"
            />
            {/* white overlay bottom to match design */}
            <div className="w-full sm:absolute top-0 right-0 h-full">
              <div className="h-full flex items-center justify-end">
                <div className="bg-yellow-400 p-6 shadow text-sm text-gray-800 w-full sm:w-62 h-full flex flex-col">
                  <div className="flex gap-2">
                    📅
                    <div>
                      <div className={titleStyle}>Date : </div>
                      <div className={textStyle}>
                        {event.date
                          ? new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : ""}
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200 my-7" />

                  <div className="flex gap-3">
                    🕒
                    <div>
                      <div className={titleStyle}>Time :</div>
                      <div className={textStyle}>{event.time}</div>
                    </div>
                  </div>

                  <hr className="border-gray-200 my-7" />

                  <div className="flex gap-2">
                    <IoLocationSharp className="text-white font-bold text-xl" />
                    <div>
                      <div className={titleStyle}>Venue:</div>
                      <div className={textStyle}>{event.location}</div>
                    </div>
                  </div>

                  <hr className="border-gray-200 my-7" />

                  <div className="flex gap-2">
                    💵
                    <div>
                      <div className={titleStyle}>Price:</div>
                      <div className={textStyle}>
                        <span className="font-bold text-black text-2xl">
                          ${event.price}
                        </span>{" "}
                        / person
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="mt-6 text-2xl md:text-4xl font-semibold text-zinc-700 ">
            {event.title}
          </h1>

          <div className="mt-4 text-zinc-600">
            <h3 className="text-lg font-medium mb-2">Event Description</h3>
            <p className="leading-relaxed text-sm md:text-base text-justify text-zinc-500">
              {event.description}
            </p>
          </div>

          {/* Countdown + Buy button */}
          <BuyTicket event={event} refetchEvent={refetch}/>

          {/* Event Content / Tabs */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Event Content</h3>
            <Tab event={event} />
          </div>

          {/* Map embed */}
          <EventMap />

          <div className="h-[1px] w-full bg-gray-500/20 mt-10" />

          {/* Tags + Share  */}
          <SocialIcon category={event.category} />
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
