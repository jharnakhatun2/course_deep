import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  tickets: number;
  date: string;
  message: string;
}

const EventBookingForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
    date: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tickets" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Event Booking Data:", formData);
  };

  const labelStyle = "block text-zinc-500 mb-1 font-medium text-sm";
  const inputStyle = "w-full border border-zinc-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-yellow-400";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-lg p-6 rounded shadow-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          🎫 Event Booking Form
        </h2>

        {/* Name */}
        <div>
          <label className={labelStyle}>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelStyle}>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelStyle}>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        {/* Tickets */}
        <div>
          <label className={labelStyle}>Ticket Quantity</label>
          <input
            type="number"
            name="tickets"
            min="1"
            max="10"
            value={formData.tickets}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* Date */}
        <div>
          <label className={labelStyle}>Event Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className={inputStyle}
          />
        </div>

        {/* Message */}
        <div>
          <label className={labelStyle}>Message (optional)</label>
          <textarea
            name="message"
            rows={3}
            placeholder="Any special requests?"
            value={formData.message}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>


        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded bg-yellow-500 text-white font-medium py-2.5 hover:bg-yellow-600 transition-colors cursor-pointer"
        >
          Book Now
        </button>

        {submitted && (
          <p className="text-green-600 text-center font-medium mt-2">
            ✅ Booking Submitted Successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default EventBookingForm;
