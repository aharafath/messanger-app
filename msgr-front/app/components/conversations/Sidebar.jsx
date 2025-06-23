"use client";

import { useGetAllConversationsQuery } from "@/lib/api/messageApi";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  const { data, isLoading } = useGetAllConversationsQuery();
  const { data: session } = useSession();

  return (
    <aside className="">
      <div className="flex items-center justify-between pb-[10px] mb-3 shadow-2xl border-b border-white/10">
        <h2 className="text-xl font-semibold text-indigo-300">Conversations</h2>
        <div className="flex items-center gap-2">
          <Link href="/profile">
            <Image
              className="rounded-full h-[40px] w-[40px] object-cover object-top"
              src={"/images/useravatar.png"}
              height={40}
              width={40}
              alt="UserAvatar"
            />
          </Link>
          <Link href="/add-user">
            <Image
              className="rounded-full h-[40px] w-[40px] object-cover object-top"
              src={"/images/adduser.png"}
              height={40}
              width={40}
              alt="AddUser"
            />
          </Link>
        </div>
      </div>
      <ul className="space-y-3">
        {isLoading ? (
          // Loading skeleton
          <div className="animate-pulse space-y-3">
            {[...Array(5)].map((_, i) => (
              <li key={i} className="p-3 bg-white/5 rounded-lg cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              </li>
            ))}
          </div>
        ) : (
          data &&
          data.length > 0 &&
          data?.map((conversation, i) => {
            const otherParticipant = conversation.participants.find(
              (item) => item._id !== session?.user?.id
            );

            return (
              <li
                key={conversation._id}
                className="p-3 bg-white/5 rounded-lg hover:bg-indigo-500/20 cursor-pointer"
              >
                <Link href={`/messages/${otherParticipant?._id}`}>
                  <div className="flex items-center gap-3">
                    <div>
                      <Image
                        className="rounded-full h-[50px] w-[50px] object-cover object-top"
                        src={
                          otherParticipant?.profilePhoto ||
                          "/images/useravatar.png"
                        }
                        height={40}
                        width={40}
                        alt="UserAvatar"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-white">
                        {otherParticipant.name}
                      </p>
                      <p className="text-sm max-w-full line-clamp-1 overflow-hidden text-gray-400">
                        {conversation.lastMessage
                          ? conversation.lastMessage.content
                          : "No messages yet"}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
