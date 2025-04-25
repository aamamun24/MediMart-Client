import { baseApi } from "../../api/baseApi";
import { IUser } from "./userSlice";


const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<{ data: IUser }, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
    }),

    getAllUser: builder.query<{ data: IUser }, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<{ data: IUser }, Partial<IUser>>({
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

export const { useGetUserQuery, useUpdateUserMutation, useUpdatePasswordMutation, useGetAllUserQuery } = userApi;