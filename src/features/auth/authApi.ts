import { apiSlice } from "../api/apiSlice";

//Get url : /users , /users/:id , /users (patch), /users/:id (delete)
//post url :  /auth/register , /auth/login ,  /auth/logout

// Type definitions
export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
  lastSignInTime?: string;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
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
      }),
    }),

    // Login user
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          body,
          credentials: "include", // ✅ send/receive cookies
        }),
        invalidatesTags: ['User'],
      }
    ),

    // Logout user
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include", // ✅ clear cookie
      }),
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
