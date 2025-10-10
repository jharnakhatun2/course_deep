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
          <p className="flex text-zinc-600">
              Showing{" "}
              <span className="font-bold px-1">
                {startIndex + 1}–{" "}
                {Math.min(startIndex + itemsPerPage, totalItems)}
              </span>{" "}
              of <span className="px-2 font-bold">{totalItems}</span> results
            </p>
        </div>
        <div className="h-[1px] w-full bg-gray-500/20 -mt-4 mb-4"></div>

        {/* Paginated events */}
        {currentEvents.map((event) => (
          <ECard
            key={event._id}
            event={event}
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
