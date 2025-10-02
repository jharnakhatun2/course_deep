import type { FC } from "react";
import type { Comment } from "../../ult/types/types";

interface CommentsListProps {
  comments: Comment[];
  handleDelete: (commentId: string) => void;
}

const CommentsList: FC<CommentsListProps> = ({ comments, handleDelete }) => {
  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start gap-4 border-b pb-4"
            >
              {/* User Image */}
              <img
                src={comment.image}
                alt={comment.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">
                {/* Name & Date */}
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{comment.name}</h4>
                  <small className="text-gray-500">{comment.date}</small>
                </div>

                {/* Comment text */}
                <p className="text-gray-700 mt-1">{comment.comment}</p>

                {/* Optional website */}
                {comment.website && (
                  <a
                    href={comment.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 text-sm mt-1 inline-block"
                  >
                    {comment.website}
                  </a>
                )}

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 text-xs mt-2 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;