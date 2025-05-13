"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "@/store/store";
import { selectUser } from "@/store/slices/userSlice";

interface ProfileFormData {
  username: string;
  name: string;
  email: string;
  phone: string;
  gender: string;
  day: string;
  month: string;
  year: string;
}

const ProfilePage = () => {
  const user = useAppSelector(selectUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      gender: "",
      day: "",
      month: "",
      year: "",
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    // Handle form submission (e.g., call API)
    console.log(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-10 w-full flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-10 text-custom-wine text-center tracking-tight drop-shadow-sm">
        My Profile
      </h2>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-base font-semibold mb-2 text-gray-800">
            Username
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed text-base"
            value={user?.username || ""}
            disabled
            {...register("username")}
          />
        </div>
        <div>
          <label className="block text-base font-semibold mb-2 text-gray-800">
            Name
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">
              {errors.name.message as string}
            </span>
          )}
        </div>
        <div>
          <label className="block text-base font-semibold mb-2 text-gray-800">
            Email
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed text-base"
            value={user?.email || ""}
            disabled
            {...register("email")}
          />
        </div>
        <div>
          <label className="block text-base font-semibold mb-2 text-gray-800">
            Phone Number
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base"
            placeholder="Add your phone number"
            {...register("phone")}
          />
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          <span className="text-base font-semibold text-gray-800">Gender:</span>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              value="male"
              {...register("gender")}
              className="accent-custom-wine"
            />
            Male
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              value="female"
              {...register("gender")}
              className="accent-custom-wine"
            />
            Female
          </label>
          <label className="flex items-center gap-2 text-gray-700">
            <input
              type="radio"
              value="other"
              {...register("gender")}
              className="accent-custom-wine"
            />
            Other
          </label>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-base font-semibold mb-2 text-gray-800">
              Day
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base"
              placeholder="Day"
              {...register("day")}
            />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold mb-2 text-gray-800">
              Month
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base"
              placeholder="Month"
              {...register("month")}
            />
          </div>
          <div className="flex-1">
            <label className="block text-base font-semibold mb-2 text-gray-800">
              Year
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg p-3 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base"
              placeholder="Year"
              {...register("year")}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 bg-custom-wine text-white px-8 py-3 rounded-xl font-bold hover:bg-pink-700 transition-all shadow-lg w-full text-lg tracking-wide"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
