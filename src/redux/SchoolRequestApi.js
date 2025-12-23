import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const requestApi = createApi({
  reducerPath: "requestApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/requests`,
  }),
  tagTypes: ["Request"],

  endpoints: (builder) => ({
    // Get all requests
    getRequests: builder.query({
      query: () => "/",
      providesTags: ["Request"],
    }),

    // Get a single request by ID
    getRequest: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Request"],
    }),

    // Create a new request
    addRequest: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Request"],
    }),

    // Update request status
    updateRequestStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Request"],
    }),

    // Delete a request
    deleteRequest: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Request"],
    }),
  }),
});

export const {
  useGetRequestsQuery,
  useGetRequestQuery,
  useAddRequestMutation,
  useUpdateRequestStatusMutation,
  useDeleteRequestMutation,
} = requestApi;
