import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api`,
  }),

  endpoints: (builder) => ({
    getTasksByTeacher: builder.query({
      query: (teacherId) => `/task/${teacherId}`,
    }),

    // ✅ New endpoint to get a task by ID
    getTaskById: builder.query({
      query: (taskId) => `/task/task/${taskId}`,
    }),

    // ✅ New endpoint to get all tasks
    getAllTasks: builder.query({
      query: () => `/task`,
    }),
  }),
});

export const {
  useGetTasksByTeacherQuery,
  useGetTaskByIdQuery,
  useGetAllTasksQuery,
} = taskApi;
