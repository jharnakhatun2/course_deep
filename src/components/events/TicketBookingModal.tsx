import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface TicketBookingModalProps {
  onClose: () => void;
}

const TicketBookingModal: React.FC<TicketBookingModalProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    quantity: 1,
    payment: "card",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Ticket booked successfully for ${form.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          <IoClose size={24} />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          🎟️ Book Your Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Ticket Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={form.quantity}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Payment Method</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bkash">bKash</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketBookingModal;
