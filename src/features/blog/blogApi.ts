import type { BlogPost } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";


export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ returns an array of BlogPost, no args
    getBlogs: builder.query<BlogPost[], void>({
      query: () => "/blogs",
      providesTags: ["Blogs"],
    }),

    // ✅ returns a single BlogPost, requires id
    getBlogById: builder.query<BlogPost, string>({
      query: (id) => `/blogs/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Blogs", id }],
    }),

    // ✅ create new blog
    addBlog: builder.mutation<BlogPost, Partial<BlogPost>>({
      query: (newBlog) => ({
        url: "/blogs",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blogs"],
    }),

    // ✅ update blog
    updateBlog: builder.mutation<BlogPost, { id: string; data: Partial<BlogPost> }>({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Blogs", id }],
    }),

    // ✅ delete blog
    deleteBlog: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery,
  useAddBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
