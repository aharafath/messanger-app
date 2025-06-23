"use client";

import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/lib/api/userApi";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";

import dayjs from "dayjs";
import bloodGroups from "../data/bloodGroups";
import genders from "../data/genders";
import locations from "../data/locations.json";
import RenderListbox from "./component/RenderListbox";
import LocationsRenderListbox from "./component/LocationsRenderListbox";

const EditProfile = () => {
  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const { data: session, update } = useSession();

  const { data: singleUserData, isLoading } = useGetSingleUserQuery(
    session?.user?.id
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    publishYourPhone: "yes",
    bloodGroup: "Unknown",
    division: "",
    district: "",
    upazila: "",
    lastDonation: null,
    dob: null,
    gender: "",
    donationCount: 0,
    profilePhoto: null,
  });

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

  const [profilePhoto, setProfilePhoto] = useState();

  useEffect(() => {
    if (!isLoading && singleUserData) {
      setFormData({
        name: singleUserData.name || "",
        phone: singleUserData.phone || "",
        publishYourPhone: singleUserData.publishYourPhone || "yes",
        bloodGroup: singleUserData.bloodGroup || "Unknown",
        division: singleUserData.division || null,
        district: singleUserData.district || null,
        upazila: singleUserData.upazila || null,
        donationCount: singleUserData.donationCount || 0,
        lastDonation: singleUserData.lastDonation
          ? dayjs(singleUserData.lastDonation).format("YYYY-MM-DD")
          : null,
        dob: singleUserData.dob
          ? dayjs(singleUserData.dob).format("YYYY-MM-DD")
          : null,
        gender: singleUserData.gender || "",

        profilePhoto: null,
      });
      setProfilePhoto(singleUserData.profilePhoto || "/images/useravatar.png");
    }
  }, [session, isLoading, singleUserData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        if (["dob", "lastDonation"].includes(key)) {
          updatedData.append(key, new Date(value).toISOString());
        } else {
          updatedData.append(key, value);
        }
      }
    });

    await updateUser({ id: session.user.id, data: updatedData })
      .unwrap()
      .then((res) => {
        if (res?.user) {
          toast("Profile updated successfully!");
          update({
            ...session,
            user: {
              ...session.user,
              ...res.user,
            },
          });
        } else {
          console.log(res);

          toast("Failed to update profile. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert(err?.data?.message || "Something went wrong");
      });
  };

  if (isLoading) {
    return (
      //Skeleton loading state
      <main className="flex items-center justify-center h-screen">
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-96 bg-gray-700 rounded-md mb-6"></div>
          <div className="h-28 w-28 bg-gray-700 rounded-full mx-auto mb-4"></div>
          <div className="space-y-5 ">
            <div className="h-10 w-full bg-gray-700 rounded-md"></div>
            <div className="h-10 w-full bg-gray-700 rounded-md"></div>
            <div className="h-10 w-full bg-gray-700 rounded-md"></div>
            <div className="h-10 w-full bg-gray-700 rounded-md"></div>
            <div className="h-10 w-full bg-gray-700 rounded-md"></div>
            <div className="h-10 w-full bg-gray-700 rounded-md"></div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mt-14 bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-indigo-400 mb-6 text-center">
          Edit Profile
        </h2>

        {/* Profile Photo Upload */}
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
              alt="Profile"
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

        {/* Text Inputs */}
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Donation Time Count", name: "donationCount", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              name={name}
              value={formData[name]}
              onChange={handleChange}
              type={type}
              className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        ))}
        {/* Phone Visibility Toggle */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="publishYourPhone"
            checked={formData.publishYourPhone === "yes"}
            onChange={(e) => {
              console.log(e.target.checked);
              setFormData({
                ...formData,
                publishYourPhone: e.target.checked ? "yes" : "no",
              });
            }}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label className="ml-2 text-sm text-white">
            Publish Your Phone Number
          </label>
        </div>

        {/* Dropdowns */}

        <RenderListbox
          label={"Blood Group"}
          name={"bloodGroup"}
          options={bloodGroups}
          formData={formData}
          setFormData={setFormData}
        />

        <RenderListbox
          label={"Gender"}
          name={"gender"}
          options={genders}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* DOB */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Date of Birth
            </label>
            <DatePicker
              selected={formData.dob}
              onChange={(date) => setFormData({ ...formData, dob: date })}
              className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              placeholderText="Select your birth date"
            />
          </div>

          {/* Last Donation Date */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Last Donation Date (is donated)
            </label>
            <DatePicker
              selected={formData.lastDonation}
              onChange={(date) =>
                setFormData({ ...formData, lastDonation: date })
              }
              className="w-full px-4 py-2 bg-white/10 text-white border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="yyyy-MM-dd"
              maxDate={new Date()}
              placeholderText="Select your last donation date"
            />
          </div>
        </div>

        <button
          disabled={isUpdateLoading}
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          {isUpdateLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </main>
  );
};

export default EditProfile;
