import { useState, type FC } from "react";
import { useAddCommentMutation } from "../../features/comments/commentsApi";

interface Props {
  blogId: string;
}

const CommentsForm: FC<Props> = ({ blogId }) => {
  const [addComment] = useAddCommentMutation();
  
  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
  });

  // Handle form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment) return;

    await addComment({ blogId, ...formData });
    setFormData({ name: "", email: "", website: "", comment: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 bg-gray-50 p-5 rounded-lg shadow"
    >
      <input
        type="text"
        name="name"
        placeholder="Your Name *"
        value={formData.name}
        onChange={handleChange}
        className="border rounded p-2 w-full"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email *"
        value={formData.email}
        onChange={handleChange}
        className="border rounded p-2 w-full"
        required
      />
      <input
        type="text"
        name="website"
        placeholder="Your Website (optional)"
        value={formData.website}
        onChange={handleChange}
        className="border rounded p-2 w-full"
      />
      <textarea
        name="comment"
        placeholder="Your Comment *"
        value={formData.comment}
        onChange={handleChange}
        className="border rounded p-2 w-full min-h-[100px]"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Comment
      </button>
    </form>
  );
};

export default CommentsForm;
