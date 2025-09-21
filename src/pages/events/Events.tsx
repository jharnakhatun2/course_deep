import { useGetEventsQuery } from "../../features/event/eventApi";
import Loader from "../../ult/loader/Loader";

const Events = () => {
  const {
    data: events,
    isLoading: eventsLoading,
    isError: eventsError,
  } = useGetEventsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  if (eventsLoading) return <Loader />;
  if (eventsError || !events) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load Events!</p>
    );
  }

  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-8">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-6 shadow rounded-lg hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600">{event.date}</p>
            <p className="mt-2 text-gray-700">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;
