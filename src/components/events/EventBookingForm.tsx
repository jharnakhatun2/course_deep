import { useState, useEffect, type FC } from "react";
import { IoClose } from "react-icons/io5";
import { useUpdateEventSeatsMutation } from "../../features/event/eventApi";
import { useAuth } from "../../hook/useAuth";
import type { Event } from "../../ult/types/types";
import { useCreateBookingMutation } from "../../features/bookings/bookingsApi";
import { showErrorToast } from "../../ult/toast/toast";

interface EventBookingFormProps {
  event: Event;
  onClose: () => void;
  refetchEvent: () => void;
}

const EventBookingForm: FC<EventBookingFormProps> = ({
  event,
  onClose,
  refetchEvent,
}) => {
  const { user } = useAuth();
  const [updateSeats] = useUpdateEventSeatsMutation();
  const [createBooking, { isLoading, isError, isSuccess }] =
    useCreateBookingMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventTitle: event?.title || "",
    tickets: 1,
    date: event?.date || "",
  });

  // Auto-fill user info
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tickets" ? Number(value) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("first");
    if (formData.tickets > event.seats) {
      showErrorToast("Not enough seats available!");
      return;
    }

    if (!event._id) {
      showErrorToast("Event ID is missing!");
      return;
    }

    try {
      // Step 1: Create booking (backend prevents duplicate bookings)
      const bookingResult = await createBooking(formData).unwrap();
      console.log("Booking API response:", bookingResult);

      // Step 2: Update event seats after successful booking
      const remainingSeats = event.seats - formData.tickets;
      await updateSeats({ id: event._id, seats: remainingSeats }).unwrap();

      await refetchEvent(); // Refresh event data
      setTimeout(() => onClose(), 1500);
    } catch (err: any) {
      console.error("Booking error:", err);
      if (err?.data) {
        showErrorToast(err.data); // e.g. "You have already booked this event."
      } else {
        showErrorToast("Something went wrong. Please try again.");
      }
    }
  };

  const labelStyle = "block text-zinc-600 mb-1 font-medium text-sm";
  const inputStyle =
    "w-full text-zinc-700 border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-400";

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/80 flex justify-center items-center min-h-screen py-10 z-50 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="relative backdrop-blur-lg bg-white/95 w-full max-w-md p-6 rounded shadow-lg space-y-4 my-20"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          🎫 Book Your Seat
        </h2>

        {/* Full Name */}
        <div>
          <label className={labelStyle}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            readOnly
            className={`${inputStyle} bg-gray-100 !text-zinc-500`}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelStyle}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className={`${inputStyle} bg-gray-100 !text-zinc-500`}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelStyle}>Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        {/* Event */}
        <div>
          <label className={labelStyle}>Event</label>
          <input
            type="text"
            name="eventTitle"
            value={formData.eventTitle}
            readOnly
            className={`${inputStyle} bg-gray-100 !text-zinc-500`}
          />
        </div>

        {/* Ticket Quantity */}
        <div>
          <label className={labelStyle}>
            Ticket Quantity{" "}
            <span className="text-red-700">(Max: {event.seats})</span>
          </label>
          <input
            type="number"
            name="tickets"
            min="1"
            max={event.seats}
            value={formData.tickets}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Event Date */}
        <div>
          <label className={labelStyle}>Event Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            readOnly
            className={`${inputStyle} bg-gray-100 !text-zinc-500`}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={event.seats <= 0 || isLoading}
          className={`w-full rounded font-medium py-2.5 uppercase transition-colors cursor-pointer ${
            event.seats <= 0
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          {isLoading
            ? "Processing..."
            : event.seats <= 0
            ? "Sold Out"
            : "Book Now"}
        </button>

        {/* RTK Query Status Messages */}
        {isError && (
          <p className="text-red-600 text-center font-medium mt-2">
            Something went wrong. Please try again.
          </p>
        )}

        {isSuccess && (
          <p className="text-green-600 text-center font-medium mt-2">
            Booking Submitted Successfully!
          </p>
        )}

        {isLoading && (
          <p className="text-yellow-600 text-center font-medium mt-2">
            ⏳ Submitting your booking...
          </p>
        )}
      </form>
    </div>
  );
};

export default EventBookingForm;
