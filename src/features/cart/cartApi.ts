// src/features/cart/cartApi.ts
import type { CartItem } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<CartItem, { productId: string; quantity: number; type: 'course' | 'event'; }>({
      query: (cartItem) => ({
        url: "/cart",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<{ success: boolean }, { productId: string; type: string }>({
      query: ({ productId, type }) => ({
        url: `/cart/${productId}?type=${type}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartQuantity: builder.mutation<CartItem, { productId: string; type: string; quantity: number }>({
      query: ({ productId, type, quantity }) => ({
        url: `/cart/${productId}`,
        method: "PATCH",
        body: { type, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartQuantityMutation,
  useClearCartMutation,
} = cartApi;
