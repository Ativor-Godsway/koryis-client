// redux/studentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const studentApi = createApi({
  reducerPath: "studentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/students`,
  }),
  tagTypes: ["Student"],

  endpoints: (builder) => ({
    // GET ALL STUDENTS
    getStudents: builder.query({
      query: () => "/",
      providesTags: ["Student"],
    }),

    // GET ONE STUDENT BY CODE
    getStudent: builder.query({
      query: (code) => `/${code}`,
      providesTags: ["Student"],
    }),

    // UPDATE STUDENT
    updateStudent: builder.mutation({
      query: ({ code, ...data }) => ({
        url: `/${code}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),

    // DELETE STUDENT
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Student"],
    }),

    // ADD STUDENT (already exists)
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Student"],
    }),

    // ✅ CREATE STUDENT (explicit new endpoint)
    createStudent: builder.mutation({
      query: (studentData) => ({
        url: "/",
        method: "POST",
        body: studentData,
      }),
      invalidatesTags: ["Student"],
    }),
  }),
});

// Export hooks
export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
  useAddStudentMutation,
  useCreateStudentMutation, // ✅ NEW
} = studentApi;
