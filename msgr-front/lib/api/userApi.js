import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const userApi = createApi({
  tagTypes: ["User"],
  reducerPath: "userApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/single-user/all-users",
        method: "GET",
      }),
      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "User", id: _id })) : [],
      transformResponse: (response) =>
        response.map((user) => ({
          ...user,
          id: user._id, // Ensure each user has an id field for RTK Query
        })),
    }),
    getAllUsersForBlood: builder.query({
      query: ({ bloodGroup, division, district, upazila, available }) => ({
        url: `/single-user/get-all-users/for-blood?bloodGroup=${
          bloodGroup || ""
        }&division=${division || ""}&district=${district || ""}&upazila=${
          upazila || ""
        }&available=${available || ""}`,
        method: "GET",
      }),

      providesTags: (result) =>
        result ? result.map(({ _id }) => ({ type: "User", id: _id })) : [],
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single-user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single-user/change-email/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserPassword: builder.mutation({
      query: ({ id, data }) => ({
        url: `/single-user/change-password/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/single-user/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useGetSingleUserQuery,
  useUpdateUserEmailMutation,
  useUpdateUserPasswordMutation,
  useGetAllUsersForBloodQuery,
} = userApi;

export default userApi;
