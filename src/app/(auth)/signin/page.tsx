"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = () => {
    setErrorMessage("Invalid username or password.");
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <div className="max-w-[1200px] min-w-[928px] w-[60%] flex bg-white rounded-xl overflow-hidden">
        <div className="w-1/2 relative">
          <Image
            src="/assets/images/signin.png"
            alt="Sign in image"
            fill
            className="object-cover"
          />
        </div>
        <div className="w-1/2 py-16">
          <div className="w-[340px] flex flex-col justify-center items-start m-auto gap-4">
            <h1 className="text-[40px] font-semibold text-custom-rose">
              Sign In
            </h1>
            <p className="text-[14px]">Great to see you again! 😊</p>

            <div className="w-full">
              <input
                type="text"
                placeholder="Enter your username/email"
                className="w-full h-10 border-[1px] border-custom-purple rounded-[15px] pl-[20px] placeholder:text-[12px] placeholder:text-custom-purple text-[12px] focus:outline-none focus:border-custom-rose"
              />
              {errorMessage && (
                <p className="text-red-500 text-[12px]">{errorMessage}</p>
              )}
            </div>
            <div className="w-full">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
              <div className="flex items-center mt-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="mr-2 w-5 h-5 appearance-none border-2 border-gray-300 rounded-md checked:bg-custom-rose checked:border-custom-pink checked:before:content-['✔'] checked:before:text-white checked:before:flex checked:before:items-center checked:before:justify-center checked:before:h-full checked:before:w-full checked:before:text-[12px] font-bold"
                />
                <label className="text-[12px]">Remember Me</label>
              </div>
            </div>
            <button
              className="bg-custom-pink text-custom-purple w-full h-10 rounded-[10px] text-[15px] font-medium hover:bg-custom-rose hover:text-white active:bg-custom-purple active:text-white"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <div>
              <Link
                href={"/forget-password"}
                className="text-[12px] text-custom-purple italic hover:underline hover:text-custom-rose"
              >
                Forget your password?
              </Link>
              <div>
                <p className="text-[12px] mt-1">
                  Don&apos;t have an account?
                  <Link
                    href={"/signup"}
                    className="text-[12px] pl-2 text-custom-purple italic hover:underline hover:text-custom-rose"
                  >
                    Go to Sign Up Page
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignInPage;
