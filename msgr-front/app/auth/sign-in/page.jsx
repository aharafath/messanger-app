"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "@/lib/api/authApi";

const SignIn = () => {
  const [login, { isLoading }] = useLoginMutation();

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();

      if (res?.user && res?.token) {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        console.log("Login result:", result);

        if (result.ok) {
          toast.success("Logged in successfully");
          router.push("/");
        } else {
          toast.error("Invalid credentials");
        }
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };
  return (
    <>
      <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
        <form
          onSubmit={handleLogin}
          className="flex w-[30rem] flex-col space-y-10 bg-white/5 p-10 rounded-xl shadow-xl backdrop-blur-md"
        >
          <div className="text-center text-4xl font-semibold text-indigo-400">
            Log In
          </div>

          <div className="w-full transform border-b-2 border-gray-600 text-lg duration-300 focus-within:border-indigo-400">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-none bg-transparent text-white placeholder:text-gray-400 outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>

          <div className="w-full transform border-b-2 border-gray-600 text-lg duration-300 focus-within:border-indigo-400">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-none bg-transparent text-white placeholder:text-gray-400 outline-none placeholder:italic focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className=" cursor-pointer transform rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 font-bold text-white shadow-md duration-300 hover:opacity-90 disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "LOG IN"}
          </button>

          <p className="text-center text-lg text-gray-300">
            No account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-medium text-indigo-300 underline-offset-4 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </main>
    </>
  );
};

export default SignIn;
