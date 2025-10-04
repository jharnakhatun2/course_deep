// src/components/comments/CommentsList.tsx
import { useEffect, type FC } from "react";
import type { Comment } from "../../ult/types/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setSelectedComment,
  toggleReplying,
} from "../../features/comments/commentsSlice";
import ReplyForm from "./ReplayForm";
import ReplyComment from "./ReplayComment";
import { useNavigate } from "react-router";

interface CommentsListProps {
  comments: Comment[];
  blogId: string; // pass blogId to ReplyForm
  focusCommentId?: string;
}

const CommentsList: FC<CommentsListProps> = ({ comments, blogId, focusCommentId }) => {
  const dispatch = useAppDispatch();
  const { selectedComment, isReplying } = useAppSelector(
    (state) => state.comments
  );
  
  //for private replay
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // Auto-open reply form when focusCommentId is provided
  useEffect(() => {
    if (focusCommentId && isAuthenticated) {
      const commentToFocus = comments.find(comment => comment._id === focusCommentId);
      if (commentToFocus) {
        dispatch(setSelectedComment(commentToFocus));
        dispatch(toggleReplying(true));
      }
    }
  }, [focusCommentId, isAuthenticated, comments, dispatch]);

  const handleReply = (comment: Comment) => {
    if (!isAuthenticated) {
      // Save the target comment ID and navigate to login
      sessionStorage.setItem(
        "pendingReply",
        JSON.stringify({ 
          blogId, 
          targetCommentId: comment._id 
        })
      );
      navigate("/login", { 
        state: { from: `/blogs/${blogId}` } 
      });
      return;
    }
    
    // If already authenticated, just open the reply form
    dispatch(setSelectedComment(comment));
    dispatch(toggleReplying(true));
  };

  const handleCloseReplyForm = () => {
    dispatch(toggleReplying(false));
    dispatch(setSelectedComment(null));
  };

  return (
    <div className="">
      <h3 className="text-xl font-semibold mb-3">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-4 border p-3 border-gray-200 rounded">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-col gap-2 p-4 text-zinc-800 bg-white/70 rounded"
            >
              <div className="flex items-start gap-4">
                {/* User Image */}
                <img
                  src={comment.image}
                  alt={comment.name}
                  className="w-12 h-12 rounded-full object-cover"
                />

                <div className="flex-1">
                  {/* Name & Date */}
                  <div>
                    <h4 className="text-lg font-semibold">{comment.name}</h4>
                    <small className="text-gray-500 font-poppins text-sm">
                      {new Date(comment.date).toLocaleString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </small>
                  </div>

                  {/* Comment text */}
                  <p className="text-zinc-400 mt-1">{comment.comment}</p>

                  {/* Reply button */}
                  <button
                    onClick={() => handleReply(comment)}
                    className="text-teal-500 text-xs mt-2 border border-teal-500 px-2 py-1 cursor-pointer hover:bg-teal-500 hover:text-white transition"
                  >
                    Reply
                  </button>

                  {/* Reply Form */}
                  {isReplying && selectedComment?._id === comment._id && (
                      <ReplyForm
                        blogId={blogId}
                        comment={comment}
                        onClose={handleCloseReplyForm}
                      />
                  )}
                </div>
              </div>

              {/* Nested Replies */}
              <ReplyComment comment={comment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
