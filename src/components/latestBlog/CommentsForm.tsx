import { useEffect, useState, type FC } from "react";
import { useAddCommentMutation } from "../../features/comments/commentsApi";
import { useNavigate } from "react-router";
import { useAuth } from "../../hook/useAuth";


interface Props {
  blogId: string;
}

const CommentsForm: FC<Props> = ({ blogId }) => {
  const [addComment] = useAddCommentMutation();
  const navigate = useNavigate();
  const { user, isAuthenticated  } = useAuth()
  console.log(user)
  console.log(user?.email)

  
  // Local form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
  });

  // Auto-fill form when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [isAuthenticated, user]);

  // Handle form change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (!isAuthenticated) {
      // Save form data in sessionStorage to use after login
      sessionStorage.setItem("pendingComment", JSON.stringify({ blogId, ...formData }));
      navigate("/login", { state: { from: `/blogs/${blogId}`, message: "Please login to submit your comment" } });
      return;
    }

    // Only submit if logged in
    if (!formData.name || !formData.email || !formData.comment) return;

     try {
      await addComment({ blogId, ...formData }).unwrap();
      setFormData({ 
        name: user?.name || "", 
        email: user?.email || "", 
        website: "", 
        comment: "" 
      });
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  // Handle restoring pending comment after login
  useEffect(() => {
    if (isAuthenticated) {
      const pendingComment = sessionStorage.getItem("pendingComment");
      
      if (pendingComment) {
        const { blogId: pendingBlogId, ...savedFormData } = JSON.parse(pendingComment);
        
        // Only restore if it's for the current blog
        if (pendingBlogId === blogId) {
          setFormData(prev => ({
            ...prev,
            ...savedFormData,
            // Keep user's name/email if they're logged in now
            name: user?.name || savedFormData.name,
            email: user?.email || savedFormData.email
          }));
          
          // Clear the pending comment
          sessionStorage.removeItem("pendingComment");
        }
      }
    }
  }, [isAuthenticated, blogId, user]);

  const inputStyle = "transition-smooth border border-gray-200 rounded p-2 w-full focus:outline-none focus:shadow-[0_0_15px_#c1c1c1] backdrop-blur-lg bg-white/50"

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 p-3 border border-zinc-200"
    >
      <textarea
        name="comment"
        placeholder="Your Comment *"
        value={formData.comment}
        onChange={handleChange}
        className={`min-h-[100px] ${inputStyle}`}
        required
      />
      <div className="sm:flex gap-5 space-y-3 sm:space-y-0">
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
        disabled={isAuthenticated}
      />
      <input
        type="text"
        name="website"
        placeholder="Your Website (optional)"
        value={formData.website}
        onChange={handleChange}
        className={inputStyle}
      />
      </div>
      <button
        type="submit"
        className="bg-yellow-500 text-white px-4 py-2 hover:bg-yellow-600 transition-smooth w-full sm:w-2/6 cursor-pointer"
      >
        Submit Comment
      </button>
    </form>
  );
};

export default CommentsForm;
