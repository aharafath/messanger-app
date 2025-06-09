import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/single-user/all-users",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single-user/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/single-user/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetSingleUserQuery,
} = userApi;

export default userApi;
