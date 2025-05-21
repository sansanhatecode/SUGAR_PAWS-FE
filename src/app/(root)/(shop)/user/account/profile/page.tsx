"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetMyInfo, useUpdateMyInfo } from "@/hooks/queries/useUser";
import { toast } from "react-hot-toast";

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
  // Lấy thông tin user từ API
  const { getMyInfo } = useGetMyInfo();
  const updateProfileMutation = useUpdateMyInfo();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      username: "",
      name: "",
      email: "",
      phone: "",
      gender: "",
      day: "",
      month: "",
      year: "",
    },
  });

  // Khi có data user, set lại giá trị form
  useEffect(() => {
    if (getMyInfo.data) {
      setValue("username", getMyInfo.data.username || "");
      setValue("name", getMyInfo.data.name || "");
      setValue("email", getMyInfo.data.email || "");
      setValue("phone", getMyInfo.data.phoneNumber || "");
      setValue("gender", getMyInfo.data.gender || "");
      setValue(
        "day",
        getMyInfo.data.dayOfBirth ? String(getMyInfo.data.dayOfBirth) : ""
      );
      setValue(
        "month",
        getMyInfo.data.monthOfBirth ? String(getMyInfo.data.monthOfBirth) : ""
      );
      setValue(
        "year",
        getMyInfo.data.yearOfBirth ? String(getMyInfo.data.yearOfBirth) : ""
      );
    }
  }, [getMyInfo.data, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync({
        name: data.name,
        phoneNumber: data.phone,
        gender: data.gender,
        dayOfBirth: data.day ? Number(data.day) : undefined,
        monthOfBirth: data.month ? Number(data.month) : undefined,
        yearOfBirth: data.year ? Number(data.year) : undefined,
      });
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile!");
    }
  };

  if (getMyInfo.isLoading) {
    return <div>Loading...</div>;
  }

  if (getMyInfo.isError) {
    return <div>Failed to load profile.</div>;
  }

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
          disabled={updateProfileMutation.isPending}
        >
          {updateProfileMutation.isPending ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
