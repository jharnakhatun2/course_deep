// src/features/event/eventApi.ts
import type { Event } from "../../ult/types/types";
import { apiSlice } from "../api/apiSlice";

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET all events
    getEvents: builder.query<Event[], void>({
      query: () => "/events",
      providesTags: ["Event"],
    }),

    // GET event by id
    getEventById: builder.query<Event, string>({
      query: (id) => `/events/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Event", id }],
    }),

    // POST create event
    createEvent: builder.mutation<Event, Partial<Event>>({
      query: (newEvent) => ({
        url: "/events",
        method: "POST",
        body: newEvent,
      }),
      invalidatesTags: ["Event"],
    }),

    // PATCH update event
    updateEvent: builder.mutation<Event, { id: string; data: Partial<Event> }>({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Event", id }],
    }),

    // Update event seats

    updateEventSeats: builder.mutation<
      Event,
      { id: string; seats: number }
    >({
      query: ({ id, seats }) => ({
        url: `/events/${id}/seats`,
        method: "PATCH",
        body: { seats },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Event", id }],
    }),

    // DELETE event
    deleteEvent: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Event"],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
   useUpdateEventSeatsMutation
} = eventApi;
