import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store"; // Adjust path if necessary

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5100/api",
    credentials: "include", // Include cookies if your API uses sessions
    prepareHeaders: (headers, { getState }) => {
      const token =
        (getState() as RootState).auth?.token ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ1ZG95QGZpbmVtZWQuY29tIiwidXNlclBob25lIjoiMDE5MDg5OTg3NzEiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE3NDUxMjc0MTYsImV4cCI6MTc0NTIxMzgxNn0.4p_Dk4KBfxrr4HoP0kN7FgsReoiKUNsx4b9WVSM4yRo";
      // Auth slice is incomplete so using a token directly
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Medicine"], // Ensure this matches the tag used in medicineApi
});
