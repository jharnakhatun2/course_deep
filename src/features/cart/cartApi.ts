// src/features/cart/cartApi.ts
import type { CartItem } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], string | void>({
      query: (userEmail) => ({
        url: userEmail ? `/cart?userEmail=${userEmail}` : '/cart',
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation<CartItem, { productId: string; quantity: number; type: 'course' | 'event'; userEmail: string;}>({
      query: (cartItem) => ({
        url: "/cart",
        method: "POST",
        body: cartItem,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation<{ success: boolean }, { productId: string; type: string; userEmail?: string; }>({
      query: ({ productId, type, userEmail }) => ({
        url: `/cart/${productId}?type=${type}${userEmail ? `&userEmail=${userEmail}` : ''}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateCartQuantity: builder.mutation<CartItem, { productId: string; type: string; quantity: number; userEmail?: string; }>({
      query: ({ productId, type, quantity, userEmail }) => ({
        url: `/cart/${productId}`,
        method: "PATCH",
        body: { type, quantity, userEmail },
      }),
      invalidatesTags: ["Cart"],
    }),

    clearCart: builder.mutation<{ success: boolean }, {userEmail?: string}>({
      query: ({userEmail}={}) => ({
        url: userEmail ?  `/cart/clear?userEmail=${userEmail}` : "/cart/clear",
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
