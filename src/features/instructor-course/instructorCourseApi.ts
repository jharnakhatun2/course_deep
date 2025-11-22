import type { Course } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";


export const instructorCourseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET all instructor courses
    getInstructorCourses: builder.query<Course[], void>({
      query: () => "/instructorcourse",
      providesTags: ["Course"],
    }),

    // ✅ GET instructor course by ID
    getInstructorCourseById: builder.query<Course, string>({
      query: (id) => `/instructorcourse/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Course", id }],
    }),

    // ✅ ADD new instructor course
    addInstructorCourse: builder.mutation<Course, Partial<Course>>({
      query: (newCourse) => ({
        url: "/instructorcourse",
        method: "POST",
        body: newCourse,
      }),
      invalidatesTags: ["Course"],
    }),

    // ✅ UPDATE instructor course by ID
    updateInstructorCourse: builder.mutation<Course, { id: string; data: Partial<Course> }>({
      query: ({ id, data }) => ({
        url: `/instructorcourse/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_result, _err, { id }) => [{ type: "Course", id }, "Course"],
    }),

    // ✅ DELETE instructor course by ID
    deleteInstructorCourse: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/instructorcourse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _err, id) => [{ type: "Course", id }, "Course"],
    }),
  }),
});

export const {
  useGetInstructorCoursesQuery,
  useGetInstructorCourseByIdQuery,
  useAddInstructorCourseMutation,
  useUpdateInstructorCourseMutation,
  useDeleteInstructorCourseMutation,
} = instructorCourseApi;
