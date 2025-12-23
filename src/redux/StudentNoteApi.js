import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentNotesApi = createApi({
  reducerPath: "studentNotesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`, // <-- change if needed
    credentials: "include",
  }),

  tagTypes: ["StudentNotes"],

  endpoints: (builder) => ({
    // ✅ SEND NOTE
    sendNoteToStudent: builder.mutation({
      query: (noteData) => ({
        url: "/notes",
        method: "POST",
        body: noteData, // { teacherId, studentId, note, subject }
      }),
      invalidatesTags: ["StudentNotes"],
    }),

    // ✅ GET NOTES FOR A STUDENT
    getNotes: builder.query({
      query: (receiverId) => `/notes/student/${receiverId}`,
      providesTags: ["StudentNotes"],
    }),

    // ✅ GET NOTES BY TEACHER
    getNotesByTeacher: builder.query({
      query: (teacherId) => `/notes/teacher/${teacherId}`,
      providesTags: ["StudentNotes"],
    }),

    // ✅ MARK AS SEEN
    markNoteAsSeen: builder.mutation({
      query: (id) => ({
        url: `/notes/seen/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["StudentNotes"],
    }),

    // ✅ DELETE NOTE
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["StudentNotes"],
    }),
  }),
});

export const {
  useSendNoteToStudentMutation,
  useGetNotesQuery,
  useGetNotesByTeacherQuery,
  useMarkNoteAsSeenMutation,
  useDeleteNoteMutation,
} = studentNotesApi;
