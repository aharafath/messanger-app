"use client";

import { useLogOutMutation } from "@/lib/api/authApi";
import { useUpdateUserMutation } from "@/lib/api/userApi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const EditProfile = () => {
  const [logOut, { isLoading: isLogOutLoading }] = useLogOutMutation();
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();

  const { data: session, update } = useSession();

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    profilePhoto: null,
  });

  const [profilePhoto, setProfilePhoto] = useState();

  useEffect(() => {
    if (session) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
      });

      setProfilePhoto(session.user.profilePhoto || "/images/useravatar.png");
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append("name", formData.name);
    updatedData.append("email", formData.email);

    if (formData.profilePhoto) {
      updatedData.append("profilePhoto", formData.profilePhoto);
    }

    updateUser({ id: session.user.id, data: updatedData })
      .unwrap()
      .then((res) => {
        if (res?.user) {
          toast("Profile updated successfully!");

          update({
            name: res.user.name,
            email: res.user.email,
            profilePhoto: res.user.profilePhoto,
          });
        } else {
          console.error("Update response:", res);
          toast("Failed to update profile. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert(err?.data?.message || "Something went wrong");
      });
  };

  const handleLogOut = async () => {
    try {
      await logOut()
        .unwrap()
        .then(() => {
          signOut();
          router.push("/auth/sign-in");
        });
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white p-6 flex items-center justify-center">
      {/* Back Button */}
      <Link
        href={"/"}
        className="absolute top-6 left-6 flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="font-medium">Back to Home</span>
      </Link>
      <button
        disabled={isLogOutLoading}
        onClick={handleLogOut}
        className=" cursor-pointer absolute top-6 right-6 flex items-center gap-2 text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition"
      >
        <span className="font-medium">Sign Out</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mt-14 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Edit Profile
        </h2>

        {/* Profile Photo Upload (Improved Design) */}
        <div className="flex justify-center mb-2">
          <label
            htmlFor="profilePhoto"
            className="relative w-28 h-28 rounded-full overflow-hidden cursor-pointer group border-2 border-indigo-500 hover:shadow-lg transition"
          >
            <img
              src={
                formData.profilePhoto
                  ? URL.createObjectURL(formData.profilePhoto)
                  : profilePhoto
              }
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-4.553a1 1 0 00-1.414-1.414L13.586 8.586a2 2 0 00-.586 1.414V14a1 1 0 102 0v-4z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V8a2 2 0 012-2h3.586a1 1 0 00.707-.293l1.414-1.414a1 1 0 01.707-.293h2.172a1 1 0 01.707.293l1.414 1.414A1 1 0 0015.414 6H19a2 2 0 012 2v10a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <input
              id="profilePhoto"
              name="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          disabled={isUpdateLoading}
          type="submit"
          className=" cursor-pointer w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
};

export default EditProfile;
