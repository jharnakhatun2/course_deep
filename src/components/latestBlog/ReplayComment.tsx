// src/components/comments/ReplyComment.tsx
import type { FC } from "react";
import type { Comment } from "../../ult/types/types";

interface ReplyCommentProps {
  comment: Comment;
}

const ReplyComment: FC<ReplyCommentProps> = ({ comment }) => {
  if (!comment.replies || comment.replies.length === 0) return null;

  return (
    <div className="ml-12 mt-2 space-y-2">
      {comment.replies.map((reply) => (
        <div
          key={reply._id}
          className="flex items-start gap-3 p-2 text-zinc-700 bg-gray-50 rounded"
        >
          <img
            src={reply.image}
            alt={reply.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <h5 className="text-sm font-semibold">{reply.name}</h5>
            <small className="text-gray-400 text-xs">
              {new Date(reply.date).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </small>
            <p className="text-sm mt-1">{reply.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReplyComment;
