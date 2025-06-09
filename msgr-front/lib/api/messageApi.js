import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery,
  tagTypes: ["Conversation", "Message"],
  endpoints: (builder) => ({
    getAllConversations: builder.query({
      query: () => `user-conversation`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Conversation", id: _id })),
              { type: "Conversation", id: "LIST" },
            ]
          : [{ type: "Conversation", id: "LIST" }],
    }),

    getAllSingleUserMessage: builder.query({
      query: (otherParticipantId) =>
        `conversation-message/${otherParticipantId}`,
      providesTags: (result, error, arg) => [{ type: "Message", id: arg }],
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: `conversation-message`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Conversation", id: "LIST" },
        { type: "Message", id: arg.receiverId },
      ],
    }),
  }),
});

export const {
  useGetAllConversationsQuery,
  useGetAllSingleUserMessageQuery,
  useSendMessageMutation,
} = messageApi;

export default messageApi;
