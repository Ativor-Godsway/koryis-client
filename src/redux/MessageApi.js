import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/messages",
    credentials: "include", // if using cookies/auth
  }),
  tagTypes: ["Messages"],

  endpoints: (builder) => ({
    // ✅ GET PARENT ↔ TEACHER CHAT
    getChat: builder.query({
      query: ({ parentId, teacherId, studentId }) =>
        `/chat/${parentId}/${teacherId}/${studentId}`,
      providesTags: ["Messages"],
    }),

    // ✅ GET ALL MESSAGES FOR USER (INBOX)
    getUserMessages: builder.query({
      query: (userId) => `/user/${userId}`,
      providesTags: ["Messages"],
    }),

    // ✅ SEND MESSAGE
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Messages"],
    }),

    // ✅ MARK AS READ
    markAsRead: builder.mutation({
      query: (messageId) => ({
        url: `/read/${messageId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Messages"],
    }),

    // ✅ DELETE MESSAGE
    deleteMessage: builder.mutation({
      query: (messageId) => ({
        url: `/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetChatQuery,
  useGetUserMessagesQuery,
  useSendMessageMutation,
  useMarkAsReadMutation,
  useDeleteMessageMutation,
} = messageApi;
