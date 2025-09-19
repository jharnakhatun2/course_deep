import type { Course } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";


export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET all courses
    getCourses: builder.query<Course[], void>({
      query: () => "/courses",
      providesTags: ["Course"],
    }),

    // ✅ GET course by ID
    getCourseById: builder.query<Course, string>({
      query: (id) => `/courses/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Course", id }],
    }),

    // ✅ ADD new course
    addCourse: builder.mutation<Course, Partial<Course>>({
      query: (newCourse) => ({
        url: "/courses",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["Course"],
    }),

    // ✅ UPDATE course by ID
    updateCourse: builder.mutation<Course, { id: string; data: Partial<Course> }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => [{ type: "Course", id }, "Course"],
    }),

    // ✅ DELETE course by ID
    deleteCourse: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, id) => [{ type: "Course", id }, "Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useAddCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
