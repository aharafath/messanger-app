import React from "react";
import Sidebar from "./components/conversations/Sidebar";

const Messenger = () => {
  return (
    <main className="flex h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      {/* Sidebar */}
      <div className="w-full md:w-2/5 lg:w-1/3  bg-white/10 backdrop-blur-lg p-4 border-r border-white/10">
        <Sidebar />
      </div>

      {/* Chat Area */}
      <section className=" flex-1 flex-col justify-between hidden md:flex">
        <div className="flex justify-center items-center h-full">
          <h2>Select a conversation to start chatting</h2>
        </div>
      </section>
    </main>
  );
};

export default Messenger;
