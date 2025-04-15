"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useAuthorization } from "@/hooks/queries/useAuthorization";
import { useRouter } from "next/navigation";
import DefaultLoading from "@/components/loading/DefaultLoading";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    reenterPassword: "",
  });

  const { signUp } = useAuthorization();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.reenterPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage("");
      setLoading(true);

      try {
        await signUp.mutateAsync({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          name: formData.name,
        });
        router.push("/verify-code");
      } catch (error) {
        console.error("Sign Up Error:", error);
        setErrorMessage("Invalid username or password.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-[1200px] min-w-[928px] w-[60%] flex bg-white rounded-xl overflow-hidden">
        <div className="w-1/2 relative">
          <Image
            src="/assets/images/signin.png"
            alt="Sign up image"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-1/2 py-16">
          <div className="w-[340px] flex flex-col justify-center items-start m-auto gap-4">
            <h1 className="text-[40px] font-semibold text-custom-rose">
              Sign Up
            </h1>
            <p className="text-[14px]">Join us today! 😊</p>

            <div className="w-full">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-10 border-[1px] border-custom-purple rounded-[15px] pl-[20px] placeholder:text-[12px] placeholder:text-custom-purple text-[12px] focus:outline-none focus:border-custom-rose"
              />
            </div>
            <div className="w-full">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full h-10 border-[1px] border-custom-purple rounded-[15px] pl-[20px] placeholder:text-[12px] placeholder:text-custom-purple text-[12px] focus:outline-none focus:border-custom-rose"
              />
            </div>
            <div className="w-full">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 border-[1px] border-custom-purple rounded-[15px] pl-[20px] placeholder:text-[12px] placeholder:text-custom-purple text-[12px] focus:outline-none focus:border-custom-rose"
              />
            </div>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-10 border-[1px] border-custom-purple rounded-[15px] pl-[20px] placeholder:text-[12px] placeholder:text-custom-purple text-[12px] focus:outline-none focus:border-custom-rose"
                />
                <FontAwesomeIcon
                  width={16}
                  height={16}
                  icon={showPassword ? faEye : faEyeSlash}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-custom-purple"
                  onClick={togglePasswordVisibility}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="reenterPassword"
                  placeholder="Re-enter Password"
                  value={formData.reenterPassword}
                  onChange={handleChange}
                  className="w-full h-10 border-[1px] border-custom-purple rounded-[15px] pl-[20px] placeholder:text-[12px] placeholder:text-custom-purple text-[12px] focus:outline-none focus:border-custom-rose"
                />
                <FontAwesomeIcon
                  width={16}
                  height={16}
                  icon={showPassword ? faEye : faEyeSlash}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-custom-purple"
                  onClick={togglePasswordVisibility}
                />
              </div>
              {errorMessage && (
                <p className="text-red-500 text-[12px]">{errorMessage}</p>
              )}
            </div>
            <button
              className="bg-custom-pink text-custom-purple w-full h-10 rounded-[10px] text-[15px] font-medium hover:bg-custom-rose hover:text-white active:bg-custom-purple active:text-white"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <div>
              <p className="text-[12px] mt-1">
                Already have an account?
                <Link
                  href={"/signin"}
                  className="text-[12px] pl-2 text-custom-purple italic hover:underline hover:text-custom-rose"
                >
                  Go to Sign In Page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {loading && <DefaultLoading />}
    </main>
  );
};

export default SignUpPage;
