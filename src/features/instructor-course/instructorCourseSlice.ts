import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../ult/types/types";

interface CourseState {
  selectedCourse: Course | null;
}

const initialState: CourseState = {
  selectedCourse: null,
};

export const instructorCourseSlice = createSlice({
  name: "instructorcourse",
  initialState,
  reducers: {
    setSelectedInstructorCourse: (state, action: PayloadAction<Course | null>) => {
      state.selectedCourse = action.payload;
    },
    clearSelectedInstructorCourse: (state) => {
      state.selectedCourse = null;
    },
  },
});

// Export actions
export const { setSelectedInstructorCourse, clearSelectedInstructorCourse } = instructorCourseSlice.actions;

// Export reducer
export default instructorCourseSlice.reducer;
