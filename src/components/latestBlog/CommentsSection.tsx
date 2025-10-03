// src/components/blog/CommentsSection.tsx

import { useGetCommentsQuery } from "../../features/comments/commentsApi";
import CommentsList from "./CommentsList";
import CommentsForm from "./CommentsForm";


interface Props {
  blogId: string;
}

const CommentsSection: React.FC<Props> = ({ blogId }) => {
  // Queries & Mutations
  const { data: comments } = useGetCommentsQuery(blogId);

  return (
    <div className="mt-10">
      {/* Comments List */}
      <CommentsList comments={comments ?? []} blogId={blogId} />

      {/* Comment Form */}
      <h3 className="text-xl font-semibold mt-10 mb-2">Leave a Comment</h3>
      
        <CommentsForm blogId={blogId} />
     
    </div>
  );
};

export default CommentsSection;
