"use client";

import { useUpdateUserPasswordMutation } from "@/lib/api/userApi";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";

const EditPassword = () => {
  const { data: session } = useSession();
  const [updatePassword, { isLoading: isUpdateLoading }] =
    useUpdateUserPasswordMutation();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.oldPassword || !formData.newPassword) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    try {
      const res = await updatePassword({
        id: session.user.id,
        data: {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
      }).unwrap();

      if (res?.success) {
        toast.success("Password updated successfully!");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error("Failed to update password.");
      }
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Change Password
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">
            Current Password
          </label>
          <input
            name="oldPassword"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">
            New Password
          </label>
          <input
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-white">
            Confirm New Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isUpdateLoading}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          {isUpdateLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </main>
  );
};

export default EditPassword;
