import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASEURL } from "./http";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASEURL,
  credentials: "include",
});
