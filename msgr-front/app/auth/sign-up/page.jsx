"use client";

import { useRegisterUserMutation } from "@/lib/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const router = useRouter();

  const [register, { isLoading }] = useRegisterUserMutation();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = () => {
    if (!input.email || !input.password) {
      toast.error("Please fill in all fields");
      return;
    }

    register(input)
      .unwrap()
      .then((res) => {
        if (res?.user) {
          toast.success("Registration successful");
          router.push("/auth/sign-in");
        } else {
          console.log("Registration response:", res);

          toast.error("Registration failed");
        }
      })
      .catch((err) => {
        console.log("Registration error:", err);

        toast.error(err?.data?.message || "Something went wrong");
      });
    if (isLoading) {
      toast.info("Signing up, please wait...");
    }
  };

  return (
    <>
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
        <section className="flex w-[30rem] flex-col space-y-10 bg-white/5 p-10 rounded-xl shadow-xl backdrop-blur-md">
          <div className="text-center text-4xl font-semibold text-indigo-400">
            Sign Up
          </div>

          <div className="w-full transform border-b-2 border-gray-600 text-lg duration-300 focus-within:border-indigo-400">
            <input
              onChange={handleInputChange}
              value={input.name}
              name="name"
              type="text"
              placeholder="Name"
              className="w-full border-none bg-transparent text-white placeholder:text-gray-400 outline-none placeholder:italic focus:outline-none"
            />
          </div>
          <div className="w-full transform border-b-2 border-gray-600 text-lg duration-300 focus-within:border-indigo-400">
            <input
              onChange={handleInputChange}
              value={input.email}
              name="email"
              type="email"
              placeholder="Email"
              className="w-full border-none bg-transparent text-white placeholder:text-gray-400 outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <div className="w-full transform border-b-2 border-gray-600 text-lg duration-300 focus-within:border-indigo-400">
            <input
              onChange={handleInputChange}
              value={input.password}
              name="password"
              type="password"
              placeholder="Password"
              className="w-full border-none bg-transparent text-white placeholder:text-gray-400 outline-none placeholder:italic focus:outline-none"
            />
          </div>

          <button
            onClick={handleSignUp}
            className=" cursor-pointer transform rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 font-bold text-white shadow-md duration-300 hover:opacity-90"
          >
            {isLoading ? "Signing up..." : "SIGN UP"}
          </button>

          <p className="text-center text-lg text-gray-300">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium text-indigo-300 underline-offset-4 hover:underline"
            >
              Log In
            </Link>
          </p>
        </section>
      </main>
    </>
  );
};

export default SignUp;
