import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => "/api/feedback",
      providesTags: ["Feedback"],
    }),

    sendFeedback: builder.mutation({
      query: (data) => ({
        url: "/api/feedback",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feedback"],
    }),

    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/api/feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useSendFeedbackMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
