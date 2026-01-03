// redux/schoolApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reportApi = createApi({
  reducerPath: "reportApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/report`,
  }),
  tagTypes: ["Report"],

  endpoints: (builder) => ({
    // GET ONE SCHOOL BY CODE
    getReport: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Report"],
    }),
  }),
});

export const { useGetReportQuery } = reportApi;
