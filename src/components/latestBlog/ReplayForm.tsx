// src/components/comments/ReplyForm.tsx
import { useEffect, useState, type FC } from "react";
import type { Comment } from "../../ult/types/types";
import { useAddReplyMutation } from "../../features/comments/commentsApi";
import { useAuth } from "../../hook/useAuth";


interface Props {
  blogId: string;
  comment: Comment;
  onClose?: () => void;
}

const ReplyForm: FC<Props> = ({ blogId, comment, onClose }) => {
  const [addReply] = useAddReplyMutation();
  const { user } = useAuth() // Get current user from cookies
  console.log(user);
  console.log(user?.email);
 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  // Restore pending reply after login
  useEffect(() => {
  if (user?.email && user?.name) {
    setFormData(prev => ({
      ...prev,
      name: user.name,
      email: user.email
    }));
  }
}, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) return;
    try {
    // Wait for the mutation to complete first
    await addReply({ blogId, commentId: comment._id, ...formData }).unwrap();
    
    // Clear form and close only after successful submission
    setFormData({ name: "", email: "", comment: "" });
    onClose?.();
    
  } catch (error) {
    // Handle any errors from the mutation
    console.error("Failed to submit reply:", error);
  }
  };

  const inputStyle =
    "transition-smooth border border-gray-200 rounded p-2 w-full focus:outline-none focus:shadow-[0_0_15px_#c1c1c1] backdrop-blur-lg bg-white/50";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 mt-2 ml-12 border-l border-gray-200 pl-3"
    >
      <textarea
        name="comment"
        placeholder="Your Reply *"
        value={formData.comment}
        onChange={handleChange}
        className={`min-h-[80px] ${inputStyle}`}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        value={formData.name}
        onChange={handleChange}
        className={inputStyle}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email *"
        value={formData.email}
        onChange={handleChange}
        className={inputStyle}
        required
      />
      <button
        type="submit"
        className="bg-teal-500 text-white px-4 py-2 hover:bg-teal-600 transition-smooth w-full sm:w-2/6 cursor-pointer"
      >
        Submit Reply
      </button>
    </form>
  );
};

export default ReplyForm;
