import { apiSlice } from "../api/apiSlice";
import type { 
  Enrollment, 
  CourseContent, 
  ProgressUpdate, 
  CompleteLessonPayload,
  DuplicateCheckResponse 
} from "../../ult/types/types";

export const enrollmentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all enrollments (admin)
    getEnrollments: builder.query<Enrollment[], void>({
      query: () => "/enrollments",
      providesTags: ["Enrollments"],
    }),

    // GET enrollments by user email with course details
    getUserEnrollments: builder.query<Enrollment[], string>({
      query: (email) => `/enrollments/user/${email}`,
      providesTags: ["Enrollments"],
    }),

    // POST new enrollment (for both free and paid courses)
    createEnrollment: builder.mutation<
      { 
        _id: string; 
        message: string; 
        enrollment: Enrollment & { courseDetails?: any } 
      },
      {
        // User information
        userId: string;
        userEmail: string;
        userName: string;
        
        // Course information
        courseId: string;
        
        // Payment information (for paid courses)
        paymentIntentId?: string;
        paymentStatus?: "pending" | "succeeded" | "failed";
        paymentAmount?: number;
        paymentCurrency?: string;
      }
    >({
      query: (newEnrollment) => ({
        url: "/enrollments",
        method: "POST",
        body: newEnrollment,
      }),
      invalidatesTags: ["Enrollments", "Course", "Cart"],
    }),

    // UPDATE enrollment progress and mark lesson as completed
    updateEnrollmentProgress: builder.mutation<
      { 
        success: boolean; 
        message: string; 
        progress: number; 
        completedLessons: string[] 
      },
      { enrollmentId: string; updates: ProgressUpdate }
    >({
      query: ({ enrollmentId, updates }) => ({
        url: `/enrollments/${enrollmentId}/progress`,
        method: "PATCH",
        body: updates,
      }),
      invalidatesTags: ["Enrollments"],
    }),

    // GET specific enrollment with full course details
    getEnrollment: builder.query<Enrollment & { courseDetails?: any }, string>({
      query: (enrollmentId) => `/enrollments/${enrollmentId}`,
      providesTags: ["Enrollments"],
    }),

    // GET course content for enrolled user (for video display)
    getCourseContent: builder.query<CourseContent, string>({
      query: (enrollmentId) => `/enrollments/${enrollmentId}/course-content`,
      providesTags: ["Enrollments"],
    }),

    // MARK lesson as completed
    completeLesson: builder.mutation<
      { 
        success: boolean; 
        message: string; 
        progress: number; 
        completedLessons: string[]; 
        nextLessonId: string | null 
      },
      { enrollmentId: string; data: CompleteLessonPayload }
    >({
      query: ({ enrollmentId, data }) => ({
        url: `/enrollments/${enrollmentId}/complete-lesson`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Enrollments"],
    }),

    // CHECK duplicate enrollment
    checkDuplicateEnrollment: builder.query<
      DuplicateCheckResponse,
      { userEmail: string; courseId: string }
    >({
      query: ({ userEmail, courseId }) => 
        `/enrollments/check-duplicate/${courseId}?userEmail=${userEmail}`,
    }),
  }),
});

export const { 
  useGetEnrollmentsQuery,
  useGetUserEnrollmentsQuery,
  useCreateEnrollmentMutation,
  useUpdateEnrollmentProgressMutation,
  useGetEnrollmentQuery,
  useGetCourseContentQuery,
  useCompleteLessonMutation,
  useCheckDuplicateEnrollmentQuery
} = enrollmentsApi;