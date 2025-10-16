import type { Booking } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";


export const bookingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all bookings
    getBookings: builder.query<Booking[], void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),

    // POST create a new booking
    createBooking: builder.mutation<
      Booking,
      Omit<Booking, "_id" | "bookedAt">
    >({
      query: (newBooking) => ({
        url: "/bookings",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Bookings", "Event"], // refresh events after booking
    }),
  }),
});

export const { useGetBookingsQuery, useCreateBookingMutation } = bookingsApi;
