import { baseApi } from "../../api/baseApi";
import { User } from "./userSlice";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{ data: User }, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<{ data: User }, Partial<User>>({
      query: (userData) => ({
        url: "/users", // Fixed to match your backend route
        method: "PATCH",
        body: userData,
      }),
    }),
    // New mutation for updating password
    updatePassword: builder.mutation<{ message: string }, { oldPassword: string; newPassword: string }>({
      query: (passwordData) => ({
        url: "/users/update-password",
        method: "PATCH",
        body: passwordData,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation, useUpdatePasswordMutation } = userApi;