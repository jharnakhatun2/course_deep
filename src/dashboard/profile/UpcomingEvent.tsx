import type { FC } from "react";
import type { Event } from "../../ult/types/types";
import { useAuth } from "../../hook/useAuth";
import { useNavigate } from "react-router";

interface UpcomingEventProps {
  event: Event;
}

const UpcomingEvent: FC<UpcomingEventProps> = ({ event }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleRegisterClick = () => {
    if (!user?.email) {
      navigate("/login", { state: { from: `/events/${event._id}` } });
      return;
    }
    navigate(`/events/${event._id}`);
  };
  return (
    <div
      key={event._id}
      className="bg-white/30 grid grid-cols-1 sm:grid-cols-3 gap-5 rounded p-3 sm:p-4 hover:bg-white/60 transition-smooth hover:shadow"
    >
      <div className="sm:col-span-1">
        <img src={event.image} alt={event.name} className="rounded" />
      </div>
      <div className="sm:col-span-2 space-y-5">
        {/* event content */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-zinc-600 font-semibold text-sm sm:text-xl truncate">
              {event.name}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Location :{" "}
              <span className="font-semibold text-yellow-500">
                {event.location}
              </span>
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Time :{" "}
              <span className="font-semibold text-zinc-600"> {event.time}</span>{" "}
              | Date :{" "}
              <span className="font-semibold text-zinc-600">
                {" "}
                {event.date
                  ? new Date(event.date).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "01 January 2026"}
              </span>
            </p>
          </div>
        </div>

        {/* buttons */}
        <button
          type="button"
          onClick={handleRegisterClick}
          className="cursor-pointer py-1.5 px-6.5  hover:bg-yellow-500 text-zinc-500 hover:text-white shadow-[0_0_4px_rgba(255,221,51,0.3)]
 hover:shadow-[0_0_8px_rgba(255,221,51,0.5)] border border-zinc-300 hover:border-white transition-smooth rounded text-center "
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvent;
