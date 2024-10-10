"use client";

import React, { useState } from "react";
import { ChevronLeft, X } from "lucide-react";

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(6).fill("")); // State to hold each digit of the OTP

  // Function to handle input change
  const handleChangeOTP = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const verifyOTP = async () => {
    const fullOtp = otp.join("");
    console.log("Full OTP entered:", fullOtp);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-start text-white">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button className="text-white text-sm flex items-center">
          <span className="mr-2">
            <ChevronLeft />
          </span>
          Back
        </button>
        <div className="text-xl font-bold">ONESTEP</div>
        <button className="text-gray-400">
          <X size={24} />
        </button>
      </div>

      <div className="bg-black flex flex-col items-center justify-center min-w-screen min-h-[90vh]">
        <div className="bg-black text-white p-8 max-w-lg rounded-lg shadow-md border-gray-700 border-2">
          <h1 className="text-4xl font-semibold text-center mb-4">
            OTP Verification
          </h1>
          <p className="text-center text-gray-400 mb-8">
            Complete the Onestep verification to proceed. It is important for
            account verification
          </p>
          <p className="text-center text-gray-400 mb-8">
            Enter the OTP verification code sent to you
          </p>

          <p className="text-center text-gray-400 mb-6">10 Minutes</p>

          <div className="flex justify-center gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-input-${index}`} // Give each input a unique ID for focusing
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChangeOTP(e, index)} // Handle each input change
                className="bg-black border border-gray-600 w-12 h-12 text-center text-2xl rounded-md"
              />
            ))}
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={verifyOTP}
              className="bg-yellow-600 text-black px-6 py-3 w-full rounded-md font-semibold"
            >
              PROCEED
            </button>
          </div>

          <p className="text-center text-gray-400">
            Didn’t receive your OTP?{" "}
            <a href="/resend-otp" className="text-yellow-600 font-semibold">
              Resend OTP
            </a>
          </p>
        </div>

        <div className="text-center text-gray-500 text-sm mt-8">
          <p>
            By using Login you agree to our{" "}
            <a href="/terms" className="text-yellow-600">
              Terms & Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
