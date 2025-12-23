import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const parentApi = createApi({
  reducerPath: "parentApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/parents`,
  }),

  tagTypes: ["Parent"],

  endpoints: (builder) => ({
    // GET all parents
    getParents: builder.query({
      query: () => "/",
      providesTags: ["Parent"],
    }),

    // GET one parent
    getParent: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Parent"],
    }),

    // CREATE parent
    addParent: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Parent"],
    }),

    // UPDATE parent
    updateParent: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Parent"],
    }),

    // DELETE parent
    deleteParent: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Parent"],
    }),
  }),
});

export const {
  useGetParentsQuery,
  useGetParentQuery,
  useAddParentMutation,
  useUpdateParentMutation,
  useDeleteParentMutation,
} = parentApi;
