"use client";

import { useGetAllUsersQuery } from "@/lib/api/userApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AddUser = () => {
  const { isLoading, data } = useGetAllUsersQuery();

  const handleStartConversation = (user) => {
    alert(`Start conversation with ${user.name}`);
    // router.push(`/messenger/${user.id}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-6 relative">
      <div className="max-w-6xl mx-auto mt-12 pt-20">
        <h1 className="text-3xl font-bold text-center text-indigo-400 mb-8">
          Add a User to Start Conversation
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className=" animate-pulse p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center text-center shadow hover:shadow-lg transition-shadow"
                >
                  <div className="w-20 h-20 bg-gray-700 rounded-full mb-4"></div>
                  <div className="w-48 h-6 bg-gray-700 rounded mb-2"></div>
                  <div className="w-32 h-6 bg-gray-700 rounded mb-4"></div>
                  <div className="w-32 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
                </div>
              ))
            : data &&
              data.length > 1 &&
              data.map((user) => (
                <div
                  key={user._id}
                  className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center text-center shadow hover:shadow-lg transition-shadow"
                >
                  <div className="rounded-full my-auto ">
                    <Image
                      className="rounded-full w-[100px] h-[100px] object-cover object-top "
                      src={
                        user.profilePhoto
                          ? user.profilePhoto
                          : "/images/useravatar.png"
                      }
                      height={100}
                      width={100}
                      alt="UserAvatar"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{user.name}</h3>
                  <p className="text-gray-400 mb-4">{user.email}</p>

                  <Link
                    href={`/${user._id}`}
                    className="  flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-md hover:opacity-90 transition"
                  >
                    {/* Message SVG Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.78 9.78 0 01-4.12-.88L3 20l1.12-3.76A7.962 7.962 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    <span className="font-medium">Message</span>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </main>
  );
};

export default AddUser;
