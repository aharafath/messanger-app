"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetAllUsersForBloodQuery } from "@/lib/api/userApi";
import RenderListbox from "./profile/component/RenderListbox";
import bloodGroups from "./data/bloodGroups";
import LocationsRenderListbox from "./profile/component/LocationsRenderListbox";
import locations from "./data/locations.json";

const UserArchive = () => {
  const [formData, setFormData] = useState({
    bloodGroup: null,
    division: null,
    district: null,
    upazila: null,
    available: null,
  });

  const { data: allUserData, isLoading: allUserLoading } =
    useGetAllUsersForBloodQuery(formData);

  useEffect(() => {
    if (!formData.division) {
      setFormData((prev) => ({
        ...prev,
        district: null,
        upazila: null,
      }));
    }
  }, [formData.division]);

  useEffect(() => {
    if (!formData.district) {
      setFormData((prev) => ({
        ...prev,
        upazila: null,
      }));
    }
  }, [formData.district]);

  console.log(allUserData);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white px-4 py-10">
      <h1 className="pt-20 text-4xl font-bold text-indigo-400 text-center mb-12">
        Blood Donor Archive
      </h1>

      {/* Filters */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
        {/* Blood Group Filter */}
        <RenderListbox
          label={"Blood Group"}
          name={"bloodGroup"}
          options={bloodGroups}
          formData={formData}
          setFormData={setFormData}
        />

        <RenderListbox
          label={"Available for donate"}
          name={"available"}
          options={["Available", "Not available"]}
          formData={formData}
          setFormData={setFormData}
        />

        <LocationsRenderListbox
          label={"Division"}
          name={"division"}
          options={locations}
          formData={formData}
          setFormData={setFormData}
          type={"name"}
        />

        {formData.division && (
          <LocationsRenderListbox
            label={"District"}
            name={"district"}
            options={
              locations.find((loc) => loc.name === formData.division)
                ?.districts || []
            }
            formData={formData}
            setFormData={setFormData}
            type={"name"}
          />
        )}

        {formData.district && (
          <LocationsRenderListbox
            label={"Upazila"}
            name={"upazila"}
            options={
              locations
                .find((loc) => loc.name === formData.division)
                ?.districts.find((dist) => dist.name === formData.district)
                ?.upazilas || []
            }
            formData={formData}
            setFormData={setFormData}
            type={null}
          />
        )}
      </div>

      {allUserLoading ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 max-w-6xl mx-auto">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-white/10 rounded-xl p-6 shadow-lg text-center border border-indigo-500 backdrop-blur-md animate-pulse"
            >
              <div className="mx-auto mb-4 h-24 w-24 rounded-full border-2 border-indigo-400 bg-gray-700" />
              <div className="h-6 w-32 mx-auto bg-gray-700 rounded mb-2" />
              <div className="h-4 w-40 mx-auto bg-gray-700 rounded mb-1" />
              <div className="h-4 w-36 mx-auto bg-gray-700 rounded mb-1" />
              <div className="h-4 w-28 mx-auto bg-gray-700 rounded mb-2" />
              <div className="h-3 w-32 mx-auto bg-gray-800 rounded mt-2" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 max-w-6xl mx-auto">
          {allUserData && allUserData.length === 0 ? (
            <p className="col-span-full text-center text-gray-300">
              No users found.
            </p>
          ) : (
            allUserData &&
            allUserData.map((user) => (
              <Link
                key={user._id}
                href={`/users/${user._id}`}
                className="block"
              >
                <div className="bg-white/10 rounded-xl p-6 shadow-lg text-center border border-indigo-500 backdrop-blur-md hover:ring-2 hover:ring-indigo-400 transition-all duration-200">
                  <Image
                    src={
                      user.profilePhoto
                        ? user.profilePhoto
                        : "/images/useravatar.png"
                    }
                    alt={user.name}
                    height={96}
                    width={96}
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
                    District:{" "}
                    <span className="text-white">{user.district}</span>
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      user.availableForDonation
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {user.availableForDonation
                      ? "Available to Donate"
                      : "Not Available"}
                  </p>
                  <p className="text-gray-400 mt-2 text-sm">
                    Phone:{" "}
                    {user.publishYourPhone === "yes"
                      ? user.phone
                      : "Contact with admin for details"}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </main>
  );
};

export default UserArchive;
