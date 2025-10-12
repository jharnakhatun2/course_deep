// src/features/bookings/bookingsSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface BookingUIState {
  selectedBookingId: string | null;
  isBookingModalOpen: boolean;
}

const initialState: BookingUIState = {
  selectedBookingId: null,
  isBookingModalOpen: false,
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setSelectedBooking: (state, action: PayloadAction<string | null>) => {
      state.selectedBookingId = action.payload;
    },
    toggleBookingModal: (state, action: PayloadAction<boolean>) => {
      state.isBookingModalOpen = action.payload;
    },
  },
});

export const { setSelectedBooking, toggleBookingModal } = bookingsSlice.actions;
export default bookingsSlice.reducer;
