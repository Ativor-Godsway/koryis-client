import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gradeApi = createApi({
  reducerPath: "gradeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/grades`,
  }),
  endpoints: (builder) => ({
    // Fetch average per topic
    getPerformance: builder.query({
      query: (studentId) => `/performance/${studentId}`,
    }),
    // Fetch all grades per topic
    getAllGrades: builder.query({
      query: (studentId) => `/${studentId}`,
    }),
    // Fetch all grades per task
    getGradePerTask: builder.query({
      query: ({ studentId, taskId }) => `/${studentId}/${taskId}`,
    }),
    // Submit a grade attempt
    submitGrade: builder.mutation({
      query: (payload) => ({
        url: "/add",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetPerformanceQuery,
  useGetAllGradesQuery,
  useGetGradePerTaskQuery,
  useSubmitGradeMutation,
} = gradeApi;
