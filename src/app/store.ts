import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import blogSliceReducer from "../features/blog/blogSlice";
import courseSliceReducer from "../features/course/courseSlice";
import eventSliceReducer from "../features/event/eventSlice";
import cartSliceReducer from "../features/cart/cartSlice";
import commentsSliceReducer from "../features/comments/commentsSlice";
import bookingsSliceReducer from "../features/bookings/bookingsSlice";
import paymentSliceReducer from "../features/payment/paymentSlice";
import enrollmentsSliceReducer from "../features/enrollments/enrollmentsSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    blog: blogSliceReducer,
    course: courseSliceReducer,
    event: eventSliceReducer,
    bookings: bookingsSliceReducer,
    enrollments: enrollmentsSliceReducer,
    cart: cartSliceReducer,
    comments: commentsSliceReducer,
    payment: paymentSliceReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
