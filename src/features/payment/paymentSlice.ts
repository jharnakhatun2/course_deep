// src/features/payment/paymentSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  loading: false,
  success: false,
  error: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    startPayment(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    paymentSuccess(state) {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    paymentFailed(state, action: PayloadAction<string>) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetPayment(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  startPayment,
  paymentSuccess,
  paymentFailed,
  resetPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
