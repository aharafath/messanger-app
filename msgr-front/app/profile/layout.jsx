import React from "react";
import ProfileHeader from "./component/ProfileHeader";

const ProfileLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-6 ">
      <ProfileHeader />
      {children}
    </div>
  );
};

export default ProfileLayout;
