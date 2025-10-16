import type { Booking } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";

export const bookingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all bookings
    getBookings: builder.query<Booking[], void>({
      query: () => "/bookings",
      providesTags: ["Bookings"],
    }),

    //  ADD: GET user bookings
    getUserBookings: builder.query<Booking[], string>({
      query: (email) => `/bookings/user/${email}`,
      providesTags: ["Bookings"],
    }),

    //  UPDATED: POST create a new booking
    createBooking: builder.mutation<
      Booking,
      {
        // User information
        userId: string;
        userEmail: string;
        userName: string;
        
        // Product information
        productId: string;
        productType: "course" | "event";
        productTitle: string;
        productPrice: number;
        quantity: number;
        
        // Payment information
        paymentIntentId: string;
        paymentStatus: "pending" | "succeeded" | "failed";
        paymentAmount: number;
        paymentCurrency: string;
        
        // Event-specific
        eventDate?: string;
        eventTime?: string;
        eventLocation?: string;
        
        status: "confirmed" | "cancelled";
      }
    >({
      query: (newBooking) => ({
        url: "/bookings",
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Bookings", "Event", "Cart"],
    }),

    // ADD: Check duplicate booking
    checkDuplicateBooking: builder.query<
      { isDuplicate: boolean; existingBooking?: Booking },
      { userEmail: string; productId: string; type: string }
    >({
      query: ({ userEmail, productId, type }) => 
        `/bookings/check-duplicate?userEmail=${userEmail}&productId=${productId}&type=${type}`,
    }),
  }),
});

export const { 
  useGetBookingsQuery, 
  useGetUserBookingsQuery, 
  useCreateBookingMutation, 
  useCheckDuplicateBookingQuery 
} = bookingsApi;