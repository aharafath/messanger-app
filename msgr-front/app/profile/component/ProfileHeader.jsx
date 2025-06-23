import Link from "next/link";
import React from "react";

const ProfileHeader = () => {
  return (
    <div className="pt-20">
      <ul className="flex justify-center sm:gap-10 gap-1 items-center">
        <li className="">
          <Link
            href="/profile"
            className=" max-sm:text-xs md:tenor px-5 sm:px-10 cursor-pointer w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Profile Data
          </Link>
        </li>

        <li className="">
          <Link
            href="/profile/email"
            className=" max-sm:text-xs md:tenor px-5 sm:px-10 cursor-pointer w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Email
          </Link>
        </li>
        <li className="">
          <Link
            href="/profile/password"
            className=" max-sm:text-xs md:tenor px-5 sm:px-10 cursor-pointer w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition"
          >
            Password
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileHeader;
