// src/features/comments/commentApi.ts
import type { Comment } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET comments with replies for a specific blog
    getComments: builder.query<Comment[], string>({
      query: (blogId) => `/comments/blog/${blogId}`,
      providesTags: ["Blogs"],
    }),

    // POST add a comment
    addComment: builder.mutation<
      Comment,
      {
        blogId: string;
        name: string;
        email: string;
        website?: string;
        comment: string;
      }
    >({
      query: ({ blogId, ...payload }) => ({
        url: `/comments/blog/${blogId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Blogs"],
    }),

    // DELETE a comment
    deleteComment: builder.mutation<
      void,
      { blogId: string; commentId: string }
    >({
      query: ({ blogId, commentId }) => ({
        url: `/comments/blog/${blogId}/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),

    // POST add a reply to a comment
    addReply: builder.mutation<
      Comment, // a reply object looks like a comment
      {
        blogId: string;
        commentId: string;
        name: string;
        email: string;
        comment: string;
      }
    >({
      query: ({ blogId, commentId, ...payload }) => ({
        url: `/comments/blog/${blogId}/${commentId}/replies`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Blogs"], // refetch comments to update UI
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useAddReplyMutation,
} = commentApi;
