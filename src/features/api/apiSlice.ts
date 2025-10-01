import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: "include", // 👈 important for sending/receiving cookies
    }),
    tagTypes: ["User","Course","Event","Blogs","Cart"],
    endpoints: (builder) => ({})
});