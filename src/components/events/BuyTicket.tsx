import Countdown from "react-countdown";
import { useState, type FC } from "react";
import EventBookingForm from "./EventBookingForm";
import type { Event } from "../../ult/types/types";



interface BuyTicketProps {
  event: Event;
  refetchEvent: () => void;
}

const BuyTicket:FC<BuyTicketProps> = ({ event, refetchEvent }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const eventDate = new Date(event.date);
  const now = new Date();
  const isExpired = eventDate < now;
  const isSoldOut = event.seats <= 0;

  const handleBookNow = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="mt-8 bg-gray-900 text-white p-6 flex flex-col md:flex-row items-center justify-between">
      <Countdown
        date={eventDate}
        renderer={({ days, hours, minutes, completed }) => {
          if (completed) {
            return (
              <span className="text-yellow-400 font-semibold">
                Event Started!
              </span>
            );
          } else {
            return (
              <div className="flex gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {days}
                  </div>
                  <div className="text-xs text-gray-400">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {hours}
                  </div>
                  <div className="text-xs text-gray-400">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {minutes}
                  </div>
                  <div className="text-xs text-gray-400">Minutes</div>
                </div>
              </div>
            );
          }
        }}
      />

      <div className="mt-4 md:mt-0">
        <button
          onClick={handleBookNow}
          disabled={isExpired || isSoldOut}
          className={`px-4 py-3 uppercase text-sm transition-smooth   ${
            isExpired || isSoldOut
              ? "bg-gray-500 cursor-not-allowed"
              : `shadow-[0_0_15px_rgba(255,221,51,0.3)]
 hover:shadow-[0_0_25px_rgba(255,221,51,0.5)] bg-yellow-500 hover:bg-yellow-400  text-zinc-800 hover:text-white cursor-pointer border border-yellow-400`
          }`}
        >
          {isExpired
            ? "Booking Expired"
            : isSoldOut
            ? "Sold Out"
            : "Buy Ticket"}
        </button>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <EventBookingForm
          event={event}
          onClose={closeModal}
          refetchEvent={refetchEvent}
        />
      )}
    </div>
  );
};

export default BuyTicket;
