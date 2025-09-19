import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../../ult/types/types";

interface CourseState {
  selectedCourse: Course | null;
}

const initialState: CourseState = {
  selectedCourse: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setSelectedCourse: (state, action: PayloadAction<Course | null>) => {
      state.selectedCourse = action.payload;
    },
    clearSelectedCourse: (state) => {
      state.selectedCourse = null;
    },
  },
});

// ✅ Export actions
export const { setSelectedCourse, clearSelectedCourse } = courseSlice.actions;

// ✅ Export reducer
export default courseSlice.reducer;
