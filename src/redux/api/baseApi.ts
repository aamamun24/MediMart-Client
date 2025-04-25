
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store"; // Adjust path if necessary

// export const baseApi = createApi({
//   reducerPath: "baseApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:5100/api",
//     credentials: "include", // Include cookies if your API uses sessions
//     prepareHeaders: (headers, { getState }) => {
//       const token =
//         (getState() as RootState).auth?.token 
//       // Auth slice is incomplete so ausing a token directly
//       if (token) {
//         headers.set("Authorization", `${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: () => ({}),
// });

import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setUser, logout } from "../features/auth/authSlice";

interface ErrorData {
  message?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5100/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth?.token;
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    (result.error && result.error.status === 401) ||
    (result.error &&
      result.error.status === 500 &&
      (result.error.data as ErrorData)?.message === "jwt expired")
  ) {
    const refreshResult = await fetch(
      "http://localhost:5100/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const refreshData = await refreshResult.json();

    if (refreshData?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: refreshData.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});