import { useState } from "react";

const MessageForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("Message sent!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-8 p-6 border border-gray-200">
      <h3 className="text-lg font-bold mb-4">SEND MESSAGE</h3>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-yellow-500 transition-smooth"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-yellow-500 transition-smooth"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 border border-gray-200 rounded focus:outline-none focus:border-yellow-500 transition-smooth resize-none"
        />
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 px-4.5 transition-smooth cursor-pointer text-xs tracking-wide"
        >
          SEND NOW
        </button>
      </div>
    </div>
  );
};

export default MessageForm;
