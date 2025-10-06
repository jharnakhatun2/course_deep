import type { User } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";
import { logout } from "./authSlice";


export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
  success: boolean;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // Register new user
    register: builder.mutation<
      RegisterResponse,
      Partial<User> & { password: string }
    >({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ['User'],
    }),

    // Login user
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          body,
          credentials: "include", // send/receive cookies
        }),
        invalidatesTags: ['User'],
      }
    ),

      // Logout user
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ['User'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Clear the auth state immediately after successful logout
          dispatch(logout());
          // Reset the entire API cache
          dispatch(apiSlice.util.resetApiState());
        } catch (error) {
          // Even if the backend call fails, clear the frontend state
          dispatch(logout());
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),

    //Get current logged-in user
    getCurrentUser: builder.query<User, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['User'],
    }),

    // Get all users (admin use)
    getUsers: builder.query<User[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
        credentials: "include",
      }),
    }),

    // Get single user
    getUserById: builder.query<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),

    // Update logged-in user info
    updateUser: builder.mutation<
      { success: boolean; message: string },
      Partial<User>
    >({
      query: (body) => ({
        url: `/users`,
        method: "PATCH",
        body,
        credentials: "include",
      }),
      invalidatesTags: ['User'],
    }),

    // Delete user
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `/users/${id}`,
          method: "DELETE",
          credentials: "include",
        }),
      }
    ),
  }),
});

export const {
  useGetCurrentUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApi;
