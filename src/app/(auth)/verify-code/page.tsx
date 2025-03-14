"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

const VerifyCodePage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = () => {
    const enteredCode = code.join("");
    if (enteredCode.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit code.");
    } else {
      setErrorMessage("");
      // Handle code verification logic here
    }
  };

  return (
    <main className="w-full min-h-screen flex justify-center items-center bg-custom-yellow">
      <div className="w-[500px] flex flex-col bg-white shadow-lg rounded-2xl overflow-hidden gap-2 py-10 px-8">
        <h1 className="text-[40px] font-bold text-custom-rose text-center">Verify Your Code</h1>
        <p className="text-[14px] text-gray-600 text-center mt-2">
          Congratulations on signing up! Please verify your email to complete the registration process.
        </p>
        <p className="text-[14px] text-gray-600 text-center mb-6">Enter the 6-digit code sent to your email.</p>

        <div className="flex justify-center gap-3 mb-4">
          {code.map((num, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              value={num}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-xl font-semibold focus:outline-none focus:border-custom-rose transition-all"
            />
          ))}
        </div>
        {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

        <button
          className="bg-custom-pink text-white w-full h-12 rounded-lg text-lg font-semibold hover:bg-custom-rose transition-all mb-4"
          onClick={handleVerifyCode}
        >
          Verify Code
        </button>
        <div className="text-center">
          <Link
            href="/signin"
            className="text-[14px] text-custom-purple italic hover:underline hover:text-custom-rose"
          >
            Back to Sign In
          </Link>
        </div>
        <p className="text-[14px] text-center text-custom-purple italic hover:underline hover:text-custom-rose">Resend password?</p>
      </div>
    </main>
  );
};

export default VerifyCodePage;