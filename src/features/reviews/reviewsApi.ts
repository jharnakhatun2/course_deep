import { apiSlice } from "../api/apiSlice";

export const reviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all reviews for a specific course
    getCourseReviews: builder.query({
      query: (courseId: string) => `/reviews/course/${courseId}`,
      providesTags: (_result, _error, courseId) => [{ type: "Course", id: courseId }],
    }),

    // POST a new review for a specific course
    addCourseReview: builder.mutation({
      query: ({ courseId, data }) => ({
        url: `/reviews/course/${courseId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (_result, _error, { courseId }) => [{ type: "Course", id: courseId }],
    }),

    // DELETE a review for a specific course
    deleteCourseReview: builder.mutation({
      query: ({ courseId, reviewId }) => ({
        url: `/reviews/course/${courseId}/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, { courseId }) => [{ type: "Course", id: courseId }],
    }),
  }),
});

export const {
  useGetCourseReviewsQuery,
  useAddCourseReviewMutation,
  useDeleteCourseReviewMutation,
} = reviewsApi;
