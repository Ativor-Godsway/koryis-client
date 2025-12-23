import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentQuestionsApi = createApi({
  reducerPath: "studentQuestionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/student-questions`,
  }),
  endpoints: (builder) => ({
    // Generate/fetch student questions
    generateQuestions: builder.mutation({
      query: ({ topic, yearGroup, grade, studentId }) => ({
        url: "/",
        method: "POST",
        body: { topic, yearGroup, grade, studentId },
      }),
    }),

    // Get all tasks for a student using studentId
    getTasksByStudent: builder.query({
      query: (studentId) => `/student/${studentId}`,
    }),

    // 🔥 NEW: Get single task by taskId
    getStudentTaskById: builder.query({
      query: (taskId) => `/task/${taskId}`,
    }),
  }),
});

export const {
  useGenerateQuestionsMutation,
  useGetTasksByStudentQuery,
  useGetStudentTaskByIdQuery,
} = studentQuestionsApi;
