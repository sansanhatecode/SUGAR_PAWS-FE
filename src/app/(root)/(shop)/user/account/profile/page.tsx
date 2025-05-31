"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useGetMyInfo, useUpdateMyInfo } from "@/hooks/queries/useUser";
import { showSuccessToast } from "@/components/ui/SuccessToast";
import { showErrorToast } from "@/components/ui/ErrorToast";
import CtaButton from "@/components/ui/CtaButton";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaBirthdayCake,
} from "react-icons/fa";

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
        getMyInfo.data.dayOfBirth ? String(getMyInfo.data.dayOfBirth) : "",
      );
      setValue(
        "month",
        getMyInfo.data.monthOfBirth ? String(getMyInfo.data.monthOfBirth) : "",
      );
      setValue(
        "year",
        getMyInfo.data.yearOfBirth ? String(getMyInfo.data.yearOfBirth) : "",
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
      showSuccessToast("Profile updated successfully!");
    } catch {
      showErrorToast("Failed to update profile!");
    }
  };

  if (getMyInfo.isLoading) {
    return <div>Loading...</div>;
  }

  if (getMyInfo.isError) {
    return <div>Failed to load profile.</div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 w-full flex flex-col items-center justify-center border border-pink-100 mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-pink-100 text-custom-wine rounded-full p-3 shadow text-3xl">
          <FaUser />
        </div>
        <h2 className="text-3xl font-bold text-custom-wine text-center tracking-tight drop-shadow-sm">
          My Profile
        </h2>
      </div>
      <form
        className="flex flex-col gap-5 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="relative">
          <label className="text-base font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FaUser className="text-custom-wine" /> Username
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg px-10 py-2 bg-gray-100 text-gray-500 cursor-not-allowed text-base shadow-sm"
            disabled
            {...register("username")}
          />
          <FaUser className="absolute left-3 top-10 text-gray-300 text-lg pointer-events-none" />
        </div>
        <div className="relative">
          <label className="text-base font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FaUser className="text-custom-wine" /> Name
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base shadow-sm"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          <FaUser className="absolute left-3 top-10 text-gray-300 text-lg pointer-events-none" />
          {errors.name && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.name.message as string}
            </span>
          )}
        </div>
        <div className="relative">
          <label className="text-base font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FaEnvelope className="text-custom-wine" /> Email
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg px-10 py-2 bg-gray-100 text-gray-500 cursor-not-allowed text-base shadow-sm"
            disabled
            {...register("email")}
          />
          <FaEnvelope className="absolute left-3 top-10 text-gray-300 text-lg pointer-events-none" />
        </div>
        <div className="relative">
          <label className="text-base font-semibold mb-2 text-gray-800 flex items-center gap-2">
            <FaPhone className="text-custom-wine" /> Phone Number
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base shadow-sm"
            placeholder="Add your phone number"
            {...register("phone")}
          />
          <FaPhone className="absolute left-3 top-10 text-gray-300 text-lg pointer-events-none" />
        </div>
        <div className="flex flex-wrap gap-6 items-center">
          <span className="text-base font-semibold text-gray-800 flex items-center gap-2">
            <FaVenusMars className="text-custom-wine" /> Gender:
          </span>
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
          <div className="flex-1 relative">
            <label className="text-base font-semibold mb-2 text-gray-800 flex items-center gap-2">
              <FaBirthdayCake className="text-custom-wine" /> Day
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base shadow-sm"
              placeholder="Day"
              {...register("day")}
            />
            <FaBirthdayCake className="absolute left-3 top-10 text-gray-300 text-lg pointer-events-none" />
          </div>
          <div className="flex-1 relative">
            <label className="text-base font-semibold mb-2 text-gray-800 flex items-center gap-2">
              <FaBirthdayCake className="text-custom-wine" /> Month
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base shadow-sm"
              placeholder="Month"
              {...register("month")}
            />
            <FaBirthdayCake className="absolute left-3 top-10 text-gray-300 text-lg pointer-events-none" />
          </div>
          <div className="flex-1 relative">
            <label className="text-base font-semibold mb-2 text-gray-800 flex items-center gap-2">
              <FaBirthdayCake className="text-custom-wine" /> Year
            </label>
            <input
              className="w-full border border-gray-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-custom-wine focus:outline-none text-base shadow-sm"
              placeholder="Year"
              {...register("year")}
            />
            <FaBirthdayCake className="absolute left-3 top-10 text-gray-300 text-lg pointer-events-none" />
          </div>
        </div>
        <CtaButton
          type="submit"
          text="Save"
          onClick={() => {}} // The actual submission is handled by the form onSubmit
          variant="profile"
          isLoading={updateProfileMutation.isPending}
          loadingText="Saving..."
          icon={<FaUser />}
          loadingIcon={<FaUser />}
          disabled={updateProfileMutation.isPending}
        />
      </form>
    </div>
  );
};

export default ProfilePage;
