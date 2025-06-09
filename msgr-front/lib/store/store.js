import { configureStore } from "@reduxjs/toolkit";
import authApi from "../api/authApi";
import messageApi from "../api/messageApi";
import userApi from "../api/userApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      messageApi.middleware,
      userApi.middleware
    ),
});
