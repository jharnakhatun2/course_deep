import type { FC } from "react";
import type { Comment } from "../../ult/types/types";

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList: FC<CommentsListProps> = ({ comments }) => {
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
        <div className="space-y-4 border p-3 border-gray-200">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start gap-4 p-4 text-zinc-800 bg-white/70 "
            >
              {/* User Image */}
              <img
                src={comment.image}
                alt={comment.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                {/* Name & Date */}
                <div>
                  <h4 className="text-lg">{comment.name}</h4>
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

                {/* Delete button */}
                {/* <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 text-xs mt-2 hover:underline"
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
