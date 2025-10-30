import { type FC } from "react";
import type { Booking } from "../../ult/types/types";

interface EventCardUserProps {
  event: Booking;
  onTicketDownload: (event: Booking) => void;
}
const EventCardUser: FC<EventCardUserProps> = ({ event, onTicketDownload }) => {

  return (
    <div
      key={event._id}
      className="bg-white/30 rounded-lg p-3 sm:p-5 hover:bg-white/60 transition-smooth hover:shadow"
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          {/* Event Info */}
          <div className="flex-1 min-w-0 space-y-1">
            <h3 className="text-teal-500 font-semibold text-sm sm:text-xl">
              {event.productTitle}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              Location :{" "}
              <span className="font-semibold text-yellow-500">
                {event.eventLocation}
              </span>
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              Time :{" "}
              <span className="font-semibold text-zinc-600">
                {" "}
                {event.eventTime}
              </span>{" "}
              | Date :{" "}
              <span className="font-semibold text-zinc-600">
                {" "}
                {event.eventDate
                  ? new Date(event.eventDate).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "01 January 2026"}
              </span>
            </p>
          </div>
          {/* Event Status */}
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`px-2 sm:px-3 py-1 rounded-full text-xs whitespace-nowrap ${
                  event.status === "upcoming"
                    ? "bg-blue-500/30 text-white"
                    : event.status === "confirmed"
                    ? "bg-green-500/20 text-zinc-500"
                    : "bg-gray-500/30 text-white"
                }`}
              >
                {event.status}
              </span>
              <span className="px-2 sm:px-3 py-1 bg-purple-500/30 text-white rounded-full text-xs whitespace-nowrap">
                {event.productType}
              </span>
            </div>
            <button
              type="button"
              onClick={() => onTicketDownload(event)}
              className="mt-5 px-6 py-2 cursor-pointer font-semibold uppercase text-xs shadow transition-smooth border border-yellow-400 hover:bg-yellow-500 text-zinc-800 hover:text-white "
            >
              Download Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardUser;
