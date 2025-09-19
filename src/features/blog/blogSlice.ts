import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBlog: null, // Example: keep track of selected blog
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    clearSelectedBlog: (state) => {
      state.selectedBlog = null;
    },
  },
});

export const { setSelectedBlog, clearSelectedBlog } = blogSlice.actions;
export default blogSlice.reducer;
