"use client";

import { useSocket } from "@/hooks/useSocket";
import {
  useGetAllSingleUserMessageQuery,
  useSendMessageMutation,
} from "@/lib/api/messageApi";
import { useGetSingleUserQuery } from "@/lib/api/userApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";

const Messages = ({ userId }) => {
  const messagesEndRef = useRef(null);

  const [message, setMessages] = useState([]);

  const { data } = useSession();

  const socketRef = useSocket({
    listeners: {
      message: (msg) => {
        //Check message sender
        if (msg.sender?._id == userId) {
          setMessages((prev) => [...prev, msg]);
        }
      },
    },
  });

  const sendMessageToSocket = (input) => {
    socketRef.current.emit("message", input);
  };

  useEffect(() => {
    // Emit active user data to the socket server
    if (data?.user) {
      socketRef.current.emit("activeUser", {
        id: data?.user?.id,
        name: data?.user?.name,
        email: data?.user?.email,
      });
    }
  }, [data, socketRef]);

  const [sendMessage, { isLoading }] = useSendMessageMutation();
  const {
    isLoading: getMessageLoading,
    data: messages,
    refetch,
  } = useGetAllSingleUserMessageQuery(userId);

  const { data: userData, isLoading: userLoading } =
    useGetSingleUserQuery(userId);

  const [datas, setDatas] = useState({
    content: "",
    receiverId: userId,
  });

  const handleMessageSend = (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!datas.content.trim()) return; // Prevent sending empty messages

    sendMessage(datas)
      .unwrap()
      .then((res) => {
        console.log("Message sent successfully:", res?.data);

        // Send message to socket server
        sendMessageToSocket({ ...res?.data, receiverId: userId });

        // Update local messages state
        setMessages((prev) => [
          ...prev,
          {
            content: datas.content,
            receiverId: userId,
            sender: { _id: userId, profilePhoto: userData?.profilePhoto },
          },
        ]);
        setDatas({ ...datas, content: "" }); // Clear input after sending
      })
      .catch((err) => {
        console.log("Failed to send message:", err);
      });
    // Scroll to the bottom on load
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  useEffect(() => {
    if (!getMessageLoading && messages) {
      // Update local messages state with fetched messages
      setMessages(messages);
      // Scroll to the bottom when new messages are loaded
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [getMessageLoading, messages]);

  useEffect(() => {
    // refetch();
    // Scroll to the bottom on load
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, []);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [message]);

  return (
    <>
      {/* Header */}
      <header className="p-4 py-2 border-b border-white/10 bg-white/5 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-indigo-400">
            <Link className="md:hidden" href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 inline-block mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            {!userLoading && userData?.name}
          </h3>
          <div className="w-10 h-10  rounded-full my-auto">
            <Image
              className="rounded-full h-[40px] w-[40px] object-cover object-top"
              src={
                !userLoading && userData?.profilePhoto
                  ? userData?.profilePhoto
                  : "/images/useravatar.png"
              }
              height={50}
              width={50}
              alt="UserAvatar"
            />
          </div>
        </div>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto scroll-snap-y-container p-6 space-y-4">
        {getMessageLoading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <div className="flex items-start gap-2 max-w-5/6 animate-pulse">
                  <div className="w-10 h-10  rounded-full my-auto">
                    <Image
                      className="rounded-full"
                      src={"/images/useravatar.png"}
                      height={50}
                      width={50}
                      alt="UserAvatar"
                    />
                  </div>
                  <div className="bg-white/10 w-[50%] h-12 p-3 rounded-xl text-white max-w-5/6">
                    <p></p>
                  </div>
                </div>
                <div className="flex justify-end animate-pulse">
                  <div className="bg-indigo-600 w-[50%] h-12 p-3 rounded-xl  text-white max-w-3/4">
                    <p></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : message && message.length > 0 ? (
          message.map((msg, index) =>
            msg.sender?._id === userId ? (
              //Incoming message
              <div key={index} className="flex items-start gap-2 max-w-5/6">
                <div className="w-10 h-10  rounded-full my-auto">
                  <Image
                    className="rounded-full h-[40px] w-[40px] object-cover object-top"
                    src={msg?.sender?.profilePhoto || "/images/useravatar.png"}
                    height={50}
                    width={50}
                    alt="UserAvatar"
                  />
                </div>
                <div className="bg-white/10 p-3 rounded-xl text-white max-w-5/6">
                  <p>{msg?.content}</p>
                </div>
              </div>
            ) : (
              //outgoing message
              <div key={index} className="flex justify-end">
                <div className="bg-indigo-600 p-3 rounded-xl  text-white max-w-3/4">
                  <p>{msg?.content}</p>
                </div>
              </div>
            )
          )
        ) : (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-400">No messages yet. Start chatting!</p>
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <footer className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
        <form onSubmit={handleMessageSend} className="flex items-center gap-4">
          <input
            onKeyUp={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                handleMessageSend(e);
              }
            }}
            value={datas.content}
            onChange={(e) => setDatas({ ...datas, content: e.target.value })}
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-md bg-gray-800 text-white placeholder:text-gray-400 outline-none"
          />
          <button
            disabled={isLoading}
            type="submit"
            className=" cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-5 py-2 rounded-md font-semibold hover:opacity-90"
          >
            Send
          </button>
        </form>
      </footer>
    </>
  );
};

export default Messages;
