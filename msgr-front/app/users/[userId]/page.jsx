"use client";

import { notFound } from "next/navigation";
import { useGetSingleUserQuery } from "@/lib/api/userApi";
import { use } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

const users = [
  {
    id: "1",
    name: "Md. Rafiq",
    bloodGroup: "A+",
    district: "Dhaka",
    phone: "+8801712345678",
    email: "rafiq@example.com",
    image: "https://i.pravatar.cc/300?img=1",
    gender: "Male",
    dob: "1990-05-12",
    available: true,
    lastDonation: "2024-12-12",
    verified: true,
    donationCount: 8,
    createdAt: "2022-01-15",
  },
  {
    id: "2",
    name: "Jannat Ara",
    bloodGroup: "O-",
    district: "Khulna",
    phone: "+8801612345678",
    email: "jannat@example.com",
    image: "https://i.pravatar.cc/300?img=2",
    gender: "Female",
    dob: "1988-09-23",
    available: false,
    lastDonation: "2024-09-05",
    verified: false,
    donationCount: 3,
    createdAt: "2023-04-20",
  },
];

export default function UserProfile({ params }) {
  const { userId } = use(params);

  const { data: singleUserData, isLoading } = useGetSingleUserQuery(userId);
  console.log("SingleUserData", singleUserData);

  const user = users.find((u) => u.id === "1");
  if (!isLoading && !singleUserData) return notFound();

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-12 items-start animate-pulse">
            {/* Skeleton Image */}
            <div className="relative flex justify-center md:justify-start">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 blur-3xl opacity-60 animate-tilt"></div>
              <div className="relative w-80 h-80 rounded-3xl bg-gray-700 border-4 border-transparent shadow-lg" />
            </div>
            {/* Skeleton Details */}
            <section className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-lg border border-indigo-600">
              <div className="h-12 w-2/3 bg-gray-700 rounded mb-6" />
              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-lg">
                {/* Personal Info Skeleton */}
                <div>
                  <div className="h-6 w-32 bg-gray-700 rounded mb-3" />
                  <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-28 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-20 bg-gray-700 rounded mb-2" />
                </div>
                {/* Contact Info Skeleton */}
                <div>
                  <div className="h-6 w-32 bg-gray-700 rounded mb-3" />
                  <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-28 bg-gray-700 rounded mb-2" />
                </div>
                {/* Donation Info Skeleton */}
                <div>
                  <div className="h-6 w-32 bg-gray-700 rounded mb-3" />
                  <div className="h-4 w-24 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-28 bg-gray-700 rounded mb-2" />
                  <div className="h-4 w-36 bg-gray-700 rounded mb-2" />
                </div>
              </div>
              {/* Skeleton Button */}
              <div className="mt-10">
                <div className="w-full max-w-xs h-12 rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 opacity-60" />
              </div>
            </section>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-12 items-start">
            {/* Image with glow */}
            <div className="relative flex justify-center md:justify-start">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 blur-3xl opacity-60 animate-tilt"></div>
              <Image
                src={
                  singleUserData.profilePhoto
                    ? singleUserData.profilePhoto
                    : "/images/useravatar.png"
                }
                height={400}
                width={400}
                alt={singleUserData.name}
                className="relative w-80 h-80 rounded-3xl border-4 border-transparent shadow-lg object-top   object-cover"
              />
            </div>

            {/* Details */}
            <section className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-lg border border-indigo-600">
              <h1 className="text-5xl font-extrabold text-indigo-300 mb-6 border-b border-indigo-500 pb-2">
                {singleUserData.name}
              </h1>

              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-lg">
                {/* Personal Info */}
                <div>
                  <h2 className="text-indigo-400 font-semibold mb-3 text-xl">
                    Personal Info
                  </h2>
                  <p>
                    <span className="text-gray-400">Gender: </span>
                    <span className="text-white font-medium capitalize">
                      {singleUserData.gender}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Date of Birth: </span>
                    <span className="text-white font-medium">
                      {dayjs(singleUserData.dob).format("YYYY-MM-DD")}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Member Since: </span>
                    <span className="text-white font-medium">
                      {dayjs(singleUserData.createdAt).format("YYYY-MM-DD")}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Verified: </span>
                    <span
                      className={`font-semibold ${
                        singleUserData.isVerified
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {singleUserData.verified ? "Yes" : "No"}
                    </span>
                  </p>
                </div>

                {/* Contact Info */}
                <div>
                  <h2 className="text-indigo-400 font-semibold mb-3 text-xl">
                    Contact Info
                  </h2>
                  <p>
                    <span className="text-gray-400">Phone: </span>

                    <span className="text-white font-medium underline">
                      {singleUserData.publishYourPhone === "yes" ? (
                        <Link href={`tel:${singleUserData.phone}`}>
                          {singleUserData.phone}
                        </Link>
                      ) : (
                        <Link href="/contact-admin">
                          Contact with admin for details
                        </Link>
                      )}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Email: </span>
                    <span className="text-white font-medium underline">
                      <Link href={`mailto:${singleUserData.email}`}>
                        {singleUserData.email}
                      </Link>
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Division: </span>
                    <span className="text-white font-medium">
                      {singleUserData.division}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">District: </span>
                    <span className="text-white font-medium">
                      {singleUserData.district}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Upazila: </span>
                    <span className="text-white font-medium">
                      {singleUserData.upazila}
                    </span>
                  </p>
                </div>

                {/* Donation Info */}
                <div>
                  <h2 className="text-indigo-400 font-semibold mb-3 text-xl">
                    Donation Info
                  </h2>
                  <p>
                    <span className="text-gray-400">Blood Group: </span>
                    <span className="text-white font-medium">
                      {singleUserData.bloodGroup}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Last Donation: </span>
                    <span className="text-white font-medium">
                      {singleUserData.lastDonation
                        ? dayjs(singleUserData.lastDonation).format(
                            "YYYY-MM-DD"
                          )
                        : "Not donated"}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Donation Count: </span>
                    <span className="text-white font-medium">
                      {singleUserData.donationCount}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400">Availability: </span>
                    <span
                      className={`font-semibold ${
                        singleUserData.availableForDonation
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {singleUserData.availableForDonation
                        ? "Available to Donate"
                        : "Not Available"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Request Button */}
              <div className="mt-10">
                {singleUserData.availableForDonation && (
                  <Link
                    className="w-full block text-center max-w-xs rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-3 text-lg font-semibold text-white shadow-lg hover:opacity-90 transition"
                    href={
                      singleUserData.publishYourPhone === "yes"
                        ? `tel:${singleUserData.phone}`
                        : "/contact-admin"
                    }
                  >
                    Request Blood
                  </Link>
                )}
              </div>
            </section>
          </div>
        )}
      </div>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes tilt {
          0%,
          100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }
        .animate-tilt {
          animation: tilt 6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
