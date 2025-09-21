import { useGetEventsQuery } from "../../features/event/eventApi";
import ECard from "../../ult/cards/eventCard/ECard";
import Loader from "../../ult/loader/Loader";
import Pagination from "../../ult/pegination/Pagination";
import { usePagination } from "../../ult/pegination/usePagination";

const Events = () => {
  const {
    data: events,
    isLoading: eventsLoading,
    isError: eventsError,
  } = useGetEventsQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  // Always call hook (even if events is undefined, fallback to [])
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentItems: currentEvents,
    totalItems,
    startIndex,
    itemsPerPage,
  } = usePagination(events ?? [], 4);

  // Handle loading/error AFTER hooks
  if (eventsLoading) return <Loader />;
  if (eventsError || !events) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load Events!</p>
    );
  }

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 gap-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems}{" "}
            results
          </p>
        </div>

        {/* Paginated events */}
        {currentEvents.map((event, index) => (
          <ECard
            key={event._id}
            event={event}
            index={index}
            total={events.length}
          />
        ))}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default Events;
