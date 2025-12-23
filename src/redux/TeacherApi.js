// redux/teacherApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/teachers`,
  }),
  tagTypes: ["Teacher"],

  endpoints: (builder) => ({
    // GET ALL TEACHERS
    getTeachers: builder.query({
      query: () => "/",
      providesTags: ["Teacher"],
    }),

    // GET ONE TEACHER BY CODE
    getTeacher: builder.query({
      query: (code) => `/${code}`,
      providesTags: ["Teacher"],
    }),

    // ADD TEACHER
    addTeacher: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Teacher"],
    }),

    // UPDATE TEACHER
    updateTeacher: builder.mutation({
      query: ({ code, ...data }) => ({
        url: `/${code}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Teacher"],
    }),

    // DELETE TEACHER
    deleteTeacher: builder.mutation({
      query: (code) => ({
        url: `/${code}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Teacher"],
    }),
  }),
});

export const {
  useGetTeachersQuery,
  useGetTeacherQuery,
  useAddTeacherMutation,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;
