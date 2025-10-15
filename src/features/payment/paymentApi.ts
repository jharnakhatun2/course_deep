import { apiSlice } from "../api/apiSlice";

interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

interface CreatePaymentIntentRequest {
  cartItems: any[];
  email: string;
}

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create a PaymentIntent
    createPaymentIntent: builder.mutation<
      PaymentIntentResponse,
      CreatePaymentIntentRequest
    >({
      query: (data) => ({
        url: "/payments/create-payment-intent",
        method: "POST",
        body: data,
      }),
    }),

    // ✅ Optional: Verify payment status
    verifyPaymentStatus: builder.query<any, string>({
      query: (paymentIntentId) => `/payments/verify/${paymentIntentId}`,
    }),
  }),
});

export const {
  useCreatePaymentIntentMutation,
  useVerifyPaymentStatusQuery,
} = paymentApi;
