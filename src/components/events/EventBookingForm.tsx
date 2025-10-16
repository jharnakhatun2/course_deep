import { useState, useEffect, type FC } from "react";
import { IoClose } from "react-icons/io5";
import { useUpdateEventSeatsMutation } from "../../features/event/eventApi";
import { useAuth } from "../../hook/useAuth";
import type { Event } from "../../ult/types/types";
import { useCreateBookingMutation } from "../../features/bookings/bookingsApi";
import { showErrorToast, showSuccessToast } from "../../ult/toast/toast";
import { useAddToCartMutation } from "../../features/cart/cartApi";
import { canAddEventToCart, createCartItemFromEvent, createCompleteCartItem, isFreeEvent } from "../cart/cartHelpers";
import { useNavigate } from "react-router";

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
  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();
  const [addToCart, { isLoading: isCartLoading }] = useAddToCartMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
  });

  // Use the helper function to check if event is free
  const freeEvent = isFreeEvent(event);
  const isLoading = isBookingLoading || isCartLoading;

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

  // Calculate total price safely
  const calculateTotalPrice = (): number => {
    const price = event.price;
    const numericPrice =
      typeof price === "number" ? price : parseFloat(price as string) || 0;
    return numericPrice * formData.tickets;
  };

  //  FIXED: Handle FREE event booking with new format
  const handleFreeEventBooking = async () => {
    if (!user || !event._id) {
      showErrorToast("User or event information missing!");
      return;
    }

    const bookingData = {
      // User information
      userId: user._id,
      userEmail: user.email,
      userName: user.name,
      
      // Product information
      productId: event._id,
      productType: "event" as const,
      productTitle: event.title || event.name,
      productPrice: 0, // Free event
      quantity: formData.tickets,
      
      // Payment information (for free events)
      paymentIntentId: "free_event_no_payment",
      paymentStatus: "succeeded" as const,
      paymentAmount: 0,
      paymentCurrency: "usd",
      
      // Event-specific information
      eventDate: event.date,
      eventTime: event.time,
      eventLocation: event.location,
      
      status: "confirmed" as const,
    };

    try {
      // Create booking
      await createBooking(bookingData).unwrap();

      // Update event seats
      const remainingSeats = event.seats - formData.tickets;
      await updateSeats({ id: event._id, seats: remainingSeats }).unwrap();

      await refetchEvent();
      showSuccessToast("🎉 Your Booking is confirmed!");
      onClose();
    } catch (err: any) {
      console.error("Free event booking error:", err);
      
      // ✅ Handle duplicate booking error specifically
      if (err?.data?.includes("already booked") || err?.status === 400) {
        showErrorToast("You have already booked this event!");
      } else if (err?.data) {
        showErrorToast(err.data);
      } else {
        showErrorToast("Something went wrong. Please try again.");
      }
    }
  };

  //  FIXED: Handle PAID event - add to cart
  const handlePaidEventToCart = async () => {
  if (!user) {
    showErrorToast("Please login to book events!");
    return;
  }

  try {
    // Check if user can add this event to cart
    const canAddResult = await canAddEventToCart(user.email, event);
    
    if (!canAddResult.canAdd) {
      showErrorToast(canAddResult.reason || "Cannot add this event to cart");
      return;
    }

    // If can add, proceed with adding to cart
    const cartItemData = createCartItemFromEvent(event);
    const completeCartItem = createCompleteCartItem(cartItemData, formData.tickets, user.email);
    
    await addToCart({
      productId: completeCartItem.productId,
      type: "event",
      quantity: completeCartItem.quantity,
      userEmail: completeCartItem.userEmail,
    }).unwrap();

    showSuccessToast(`Added ${formData.tickets} ticket(s) to cart!`);
    onClose();
    navigate("/cart");
  } catch (err: any) {
    console.error("Add to cart error:", err);
    if (err?.data) {
      showErrorToast(err.data);
    } else {
      showErrorToast("Something went wrong. Please try again.");
    }
  }
};

  // Handle form submission for both free and paid events
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!user) {
      showErrorToast("Please login to book events!");
      return;
    }

    if (formData.tickets > event.seats) {
      showErrorToast("Not enough seats available!");
      return;
    }

    if (!event._id) {
      showErrorToast("Event ID is missing!");
      return;
    }

    if (!formData.phone) {
      showErrorToast("Phone number is required!");
      return;
    }

    try {
      if (freeEvent) {
        await handleFreeEventBooking();
      } else {
        await handlePaidEventToCart();
      }
    } catch (err: any) {
      console.error("Booking error:", err);
      showErrorToast("Something went wrong. Please try again.");
    }
  };

  const labelStyle = "block text-zinc-600 mb-1 font-medium text-sm";
  const inputStyle =
    "w-full text-zinc-700 border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-400";

  const totalPrice = calculateTotalPrice();

  return (
    <div className="fixed inset-0 backdrop-blur-lg bg-black/80 flex justify-center items-center min-h-screen py-10 z-50 overflow-y-auto">
      <form
        onSubmit={handleSubmit}
        className="relative backdrop-blur-lg bg-white/95 w-full max-w-md p-6 rounded shadow-lg space-y-4 my-20 top-30"
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

        {/* Event Info Card */}
        <div
          className={`border rounded p-3 ${
            freeEvent
              ? "bg-teal-50 border-teal-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <h3 className="font-semibold text-lg text-zinc-500">
            {event.title || event.name}
          </h3>
          <div className="flex justify-between items-center mt-1">
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${
                freeEvent
                  ? "bg-teal-100 text-teal-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {freeEvent ? "FREE EVENT" : "PAID EVENT"}
            </span>
            {freeEvent && (
              <span className="text-lg font-bold text-teal-600">$00.00</span>
            )}
            {!freeEvent && (
              <span className="text-lg font-bold text-yellow-600">
                ${totalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>

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
          <label className={labelStyle}>
            Phone Number <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Enter your phone number"
            className={inputStyle}
          />
        </div>

        {/* Event Info (Read-only) */}
        <div>
          <label className={labelStyle}>Event</label>
          <input
            type="text"
            value={event.title || event.name}
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
          {!freeEvent && (
            <p className="text-sm text-gray-500 mt-1">
              Total: ${totalPrice.toFixed(2)}
            </p>
          )}
        </div>

        {/* Event Date (Read-only) */}
        <div>
          <label className={labelStyle}>Event Date</label>
          <input
            type="text"
            value={event.date}
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
              : freeEvent
              ? "bg-teal-500 text-white hover:bg-teal-600"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
        >
          {isLoading
            ? "Processing..."
            : event.seats <= 0
            ? "Sold Out"
            : freeEvent
            ? `Confirm Booking ${
                formData.tickets > 1 ? `(${formData.tickets} tickets)` : ""
              }`
            : `Add to Cart - $${totalPrice.toFixed(2)}`}
        </button>

        {/* Info Message */}
        <div className="text-center text-sm text-gray-500">
          {freeEvent ? (
            <p>Your booking will be confirmed immediately</p>
          ) : (
            <p>You'll complete payment on the checkout page</p>
          )}
        </div>

        {/* Duplicate Prevention Warning */}
        {!freeEvent && (
          <div className="text-center text-xs text-orange-600 bg-orange-50 p-2 rounded">
            ⚠️ You can only book this event once per email
          </div>
        )}
      </form>
    </div>
  );
};

export default EventBookingForm;