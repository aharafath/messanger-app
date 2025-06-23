"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useUpdateUserEmailMutation } from "@/lib/api/userApi";
import { toast } from "react-toastify";

const EditEmail = () => {
  const { data: session, update } = useSession();
  const [updateUser, { isLoading: isUpdateLoading }] =
    useUpdateUserEmailMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email || "",
      }));
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.password) {
      toast.error("Please enter your password to confirm email change.");
      return;
    }

    try {
      const res = await updateUser({
        id: session.user.id,
        data: formData,
      }).unwrap();

      if (res?.user) {
        toast.success("Email updated successfully!");
        update({
          ...session,
          user: {
            ...session.user,
            email: res.user.email,
          },
        });
        setFormData({ ...formData, password: "" });
      } else {
        console.log("Update response:", res);

        toast.error("Failed to update email.");
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
          Change Email
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-white">
            New Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-white">
            Current Password
          </label>
          <input
            name="password"
            type="password"
            value={formData.password}
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
          {isUpdateLoading ? "Updating..." : "Update Email"}
        </button>
      </form>
    </main>
  );
};

export default EditEmail;
