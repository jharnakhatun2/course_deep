// src/components/comments/ReplyForm.tsx
import { useEffect, useState, type FC } from "react";
import type { Comment } from "../../ult/types/types";
import { useAddReplyMutation } from "../../features/comments/commentsApi";
import { useAppSelector } from "../../app/hooks";

interface Props {
  blogId: string;
  comment: Comment;
  onClose?: () => void;
}

const ReplyForm: FC<Props> = ({ blogId, comment, onClose }) => {
  const [addReply, { isLoading }] = useAddReplyMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  // Restore pending reply after login
  useEffect(() => {
    const pendingReply = sessionStorage.getItem("pendingReply");
    if (pendingReply && isAuthenticated) {
      const data = JSON.parse(pendingReply);
      setFormData({
        name: data.name || "",
        email: data.email || "",
        comment: data.comment || "",
      });
      sessionStorage.removeItem("pendingReply");
    }
  }, [isAuthenticated]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        disabled={isLoading}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        value={formData.name}
        onChange={handleChange}
        className={inputStyle}
        disabled={isLoading}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email *"
        value={formData.email}
        onChange={handleChange}
        className={inputStyle}
        disabled={isLoading}
        required
      />
      <button
        type="submit"
        className="bg-teal-500 text-white px-4 py-2 hover:bg-teal-600 transition-smooth w-full sm:w-2/6 cursor-pointer"
      disabled={isLoading}
      >
        {isLoading ? "Submitting..." : "Submit Reply"}
      </button>
    </form>
  );
};

export default ReplyForm;
