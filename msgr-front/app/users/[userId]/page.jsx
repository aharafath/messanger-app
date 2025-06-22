"use client";

import { notFound } from "next/navigation";
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
  const user = users.find((u) => u.id === params.userId);
  if (!user) return notFound();

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Image with glow */}
          <div className="relative flex justify-center md:justify-start">
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 blur-3xl opacity-60 animate-tilt"></div>
            <img
              src={user.image}
              alt={user.name}
              className="relative w-80 h-80 rounded-3xl border-4 border-transparent shadow-lg   object-cover"
            />
          </div>

          {/* Details */}
          <section className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-lg border border-indigo-600">
            <h1 className="text-5xl font-extrabold text-indigo-300 mb-6 border-b border-indigo-500 pb-2">
              {user.name}
            </h1>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8 text-lg">
              {/* Personal Info */}
              <div>
                <h2 className="text-indigo-400 font-semibold mb-3 text-xl">
                  Personal Info
                </h2>
                <p>
                  <span className="text-gray-400">Gender: </span>
                  <span className="text-white font-medium">{user.gender}</span>
                </p>
                <p>
                  <span className="text-gray-400">Date of Birth: </span>
                  <span className="text-white font-medium">
                    {formatDate(user.dob)}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Member Since: </span>
                  <span className="text-white font-medium">
                    {formatDate(user.createdAt)}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Verified: </span>
                  <span
                    className={`font-semibold ${
                      user.verified ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {user.verified ? "Yes" : "No"}
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
                  <span className="text-white font-medium">{user.phone}</span>
                </p>
                <p>
                  <span className="text-gray-400">Email: </span>
                  <span className="text-white font-medium">{user.email}</span>
                </p>
                <p>
                  <span className="text-gray-400">District: </span>
                  <span className="text-white font-medium">
                    {user.district}
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
                    {user.bloodGroup}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Last Donation: </span>
                  <span className="text-white font-medium">
                    {formatDate(user.lastDonation)}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Donation Count: </span>
                  <span className="text-white font-medium">
                    {user.donationCount}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Availability: </span>
                  <span
                    className={`font-semibold ${
                      user.available ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {user.available ? "Available to Donate" : "Not Available"}
                  </span>
                </p>
              </div>
            </div>

            {/* Request Button */}
            <div className="mt-10">
              <button
                disabled={!user.available}
                className="w-full max-w-xs rounded-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 py-3 text-lg font-semibold text-white shadow-lg hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {user.available ? "Request Blood" : "Currently Unavailable"}
              </button>
            </div>
          </section>
        </div>
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
