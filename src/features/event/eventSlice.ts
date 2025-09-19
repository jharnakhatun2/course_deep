// src/features/event/eventSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EventUIState {
  selectedEventId: string | null;
  isModalOpen: boolean;
}

const initialState: EventUIState = {
  selectedEventId: null,
  isModalOpen: false,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setSelectedEvent: (state, action: PayloadAction<string | null>) => {
      state.selectedEventId = action.payload;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const { setSelectedEvent, toggleModal } = eventSlice.actions;
export default eventSlice.reducer;
