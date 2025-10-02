// src/features/comments/commentsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Comment } from "../../ult/types/types";

interface CommentsState {
  selectedComment: Comment | null;
  isReplying: boolean;
}

const initialState: CommentsState = {
  selectedComment: null,
  isReplying: false,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setSelectedComment(state, action: PayloadAction<Comment | null>) {
      state.selectedComment = action.payload;
    },
    toggleReplying(state, action: PayloadAction<boolean | undefined>) {
      state.isReplying =
        action.payload !== undefined ? action.payload : !state.isReplying;
    },
  },
});

export const { setSelectedComment, toggleReplying } = commentsSlice.actions;

export default commentsSlice.reducer;
