"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const districts = [
  "Dhaka",
  "Chittagong",
  "Khulna",
  "Rajshahi",
  "Barisal",
  "Sylhet",
];

const staticUsers = [
  {
    id: "1",
    name: "Md. Rafiq",
    bloodGroup: "A+",
    district: "Dhaka",
    available: true,
    phone: "+8801712345678",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Jannat Ara",
    bloodGroup: "O-",
    district: "Khulna",
    available: false,
    phone: "+8801612345678",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "3",
    name: "Rahim Uddin",
    bloodGroup: "B+",
    district: "Sylhet",
    available: true,
    phone: "+8801912345678",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "4",
    name: "Fatema Begum",
    bloodGroup: "AB-",
    district: "Rajshahi",
    available: false,
    phone: "+8801512345678",
    image: "https://i.pravatar.cc/150?img=4",
  },
];

const UserArchive = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    bloodGroup: "",
    district: "",
    available: "",
  });

  useEffect(() => {
    setUsers(staticUsers);
    setFiltered(staticUsers);
  }, []);

  useEffect(() => {
    const result = users.filter((user) => {
      return (
        (!filters.bloodGroup || user.bloodGroup === filters.bloodGroup) &&
        (!filters.district || user.district === filters.district) &&
        (!filters.available ||
          user.available === (filters.available === "available"))
      );
    });

    setFiltered(result);
  }, [filters, users]);

  const selectStyle =
    "appearance-none w-full bg-gray-800 border border-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4 py-10">
      <h1 className="pt-20 text-4xl font-bold text-indigo-400 text-center mb-12">
        Blood Donor Archive
      </h1>

      {/* Filters */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto text-center">
        {/* Blood Group Filter */}
        <div className="relative">
          <select
            className={selectStyle}
            value={filters.bloodGroup}
            onChange={(e) =>
              setFilters({ ...filters, bloodGroup: e.target.value })
            }
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
            ▼
          </div>
        </div>

        {/* District Filter */}
        <div className="relative">
          <select
            className={selectStyle}
            value={filters.district}
            onChange={(e) =>
              setFilters({ ...filters, district: e.target.value })
            }
          >
            <option value="">All Districts</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
            ▼
          </div>
        </div>

        {/* Availability Filter */}
        <div className="relative">
          <select
            className={selectStyle}
            value={filters.available}
            onChange={(e) =>
              setFilters({ ...filters, available: e.target.value })
            }
          >
            <option value="">All Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Not Available</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-white">
            ▼
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center text-gray-300">
            No users found.
          </p>
        ) : (
          filtered.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`} className="block">
              <div className="bg-white/10 rounded-xl p-6 shadow-lg text-center border border-indigo-500 backdrop-blur-md hover:ring-2 hover:ring-indigo-400 transition-all duration-200">
                <img
                  src={user.image}
                  alt={user.name}
                  className="mx-auto mb-4 h-24 w-24 rounded-full border-2 border-indigo-400 object-cover"
                />
                <h2 className="text-xl font-semibold text-indigo-300">
                  {user.name}
                </h2>
                <p className="text-gray-300">
                  Blood Group:{" "}
                  <span className="text-white">{user.bloodGroup}</span>
                </p>
                <p className="text-gray-300">
                  District: <span className="text-white">{user.district}</span>
                </p>
                <p
                  className={`text-sm font-medium ${
                    user.available ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {user.available ? "Available to Donate" : "Not Available"}
                </p>
                <p className="text-gray-400 mt-2 text-sm">
                  Phone: {user.phone}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
};

export default UserArchive;
