// redux/schoolApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const schoolApi = createApi({
  reducerPath: "schoolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/schools`,
  }),
  tagTypes: ["School"],

  endpoints: (builder) => ({
    // GET ALL SCHOOLS
    getSchools: builder.query({
      query: () => "/",
      providesTags: ["School"],
    }),

    // GET ONE SCHOOL BY CODE
    getSchool: builder.query({
      query: (code) => `/${code}`,
      providesTags: ["School"],
    }),

    // ADD SCHOOL
    addSchool: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["School"],
    }),

    // UPDATE SCHOOL
    updateSchool: builder.mutation({
      query: ({ code, ...data }) => ({
        url: `/${code}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["School"],
    }),

    // DELETE SCHOOL
    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["School"],
    }),
  }),
});

export const {
  useGetSchoolsQuery,
  useGetSchoolQuery,
  useAddSchoolMutation,
  useUpdateSchoolMutation,
  useDeleteSchoolMutation,
} = schoolApi;
