import React from "react";
import Sidebar from "../components/conversations/Sidebar";
import Messages from "../components/conversations/Messages";

const Messenges = ({ params }) => {
  const { userId } = React.use(params);

  return (
    <main className="flex h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      {/* Sidebar */}
      <div className=" hidden md:block md:w-2/5 lg:w-1/3  bg-white/10 backdrop-blur-lg p-4 border-r border-white/10">
        <Sidebar />
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col justify-between">
        <Messages userId={userId} />
      </div>
    </main>
  );
};

export default Messenges;
