import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Enrollment, CourseContent } from "../../ult/types/types";

interface EnrollmentsUIState {
  selectedEnrollmentId: string | null;
  isEnrollmentModalOpen: boolean;
  currentCourseContent: CourseContent | null;
  continueLearning: Enrollment[];
  myCourses: Enrollment[];
  activeEnrollment: Enrollment | null;
}

const initialState: EnrollmentsUIState = {
  selectedEnrollmentId: null,
  isEnrollmentModalOpen: false,
  currentCourseContent: null,
  continueLearning: [],
  myCourses: [],
  activeEnrollment: null,
};

export const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setSelectedEnrollment: (state, action: PayloadAction<string | null>) => {
      state.selectedEnrollmentId = action.payload;
    },
    toggleEnrollmentModal: (state, action: PayloadAction<boolean>) => {
      state.isEnrollmentModalOpen = action.payload;
    },
    setCurrentCourseContent: (state, action: PayloadAction<CourseContent | null>) => {
      state.currentCourseContent = action.payload;
    },
    setContinueLearning: (state, action: PayloadAction<Enrollment[]>) => {
      // Filter active enrollments and sort by last accessed
      state.continueLearning = action.payload
        .filter(enrollment => enrollment.status === 'active')
        .sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime());
    },
    setMyCourses: (state, action: PayloadAction<Enrollment[]>) => {
      state.myCourses = action.payload;
    },
    setActiveEnrollment: (state, action: PayloadAction<Enrollment | null>) => {
      state.activeEnrollment = action.payload;
    },
    updateEnrollmentProgress: (state, action: PayloadAction<{ enrollmentId: string; progress: number; completedLessons: string[] }>) => {
      const { enrollmentId, progress, completedLessons } = action.payload;
      
      // Update in continueLearning
      state.continueLearning = state.continueLearning.map(enrollment =>
        enrollment._id === enrollmentId 
          ? { ...enrollment, progress, completedLessons, lastAccessedAt: new Date().toISOString() }
          : enrollment
      );
      
      // Update in myCourses
      state.myCourses = state.myCourses.map(enrollment =>
        enrollment._id === enrollmentId 
          ? { ...enrollment, progress, completedLessons, lastAccessedAt: new Date().toISOString() }
          : enrollment
      );
      
      // Update active enrollment if it's the same
      if (state.activeEnrollment && state.activeEnrollment._id === enrollmentId) {
        state.activeEnrollment = { 
          ...state.activeEnrollment, 
          progress, 
          completedLessons,
          lastAccessedAt: new Date().toISOString()
        };
      }
    },
    markLessonCompleted: (state, action: PayloadAction<{ enrollmentId: string; lessonId: string; nextLessonId?: string }>) => {
      const { enrollmentId, lessonId, nextLessonId } = action.payload;
      
      const updateEnrollment = (enrollment: Enrollment) => {
        if (enrollment._id === enrollmentId) {
          const completedLessons = [...new Set([...enrollment.completedLessons, lessonId])];
          const progress = Math.round((completedLessons.length / enrollment.allLessons.length) * 100);
          
          return {
            ...enrollment,
            completedLessons,
            progress,
            currentLesson: nextLessonId || enrollment.currentLesson,
            lastAccessedAt: new Date().toISOString(),
            status: progress === 100 ? 'completed' : enrollment.status
          };
        }
        return enrollment;
      };
      
      state.continueLearning = state.continueLearning.map(updateEnrollment);
      state.myCourses = state.myCourses.map(updateEnrollment);
      
      if (state.activeEnrollment && state.activeEnrollment._id === enrollmentId) {
        state.activeEnrollment = updateEnrollment(state.activeEnrollment);
      }
    },
    clearEnrollments: (state) => {
      state.continueLearning = [];
      state.myCourses = [];
      state.activeEnrollment = null;
      state.currentCourseContent = null;
    },
  },
});

export const { 
  setSelectedEnrollment,
  toggleEnrollmentModal,
  setCurrentCourseContent,
  setContinueLearning,
  setMyCourses,
  setActiveEnrollment,
  updateEnrollmentProgress,
  markLessonCompleted,
  clearEnrollments
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;