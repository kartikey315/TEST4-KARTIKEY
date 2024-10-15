"use client";

import React, { useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";

interface UserPageProps {
  params: { id: number };
}

const OTPVerification = ({ params }: UserPageProps) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const router = useRouter();
  const pathName = usePathname();

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
    console.log(otp.length);
    if (otp.includes("")) {
      alert("Please Enter Valid OTP");
    }
    try {
      const fullOtp = otp.join("");
      const telegramId = params.id;
      const res = await axios.post("/api/otp/verify-otp", {
        telegramId: telegramId.toString(),
        otp: fullOtp,
      });

      console.log(res);
      if (res.data.status == "SUCCESS") {
        alert("OTP Verified Successfully");
        if (pathName.includes("/signup")) {
          router.replace(`/signup/registration/${telegramId}`);
        } else {
          router.push("/");
        }
      } else {
        alert("Wrong OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleResendOTP = async (telegramId: string) => {
    try {
      const res = await axios.post("/api/otp/resend-otp", { telegramId });
      if (res.data.status === "SUCCESS") {
        const newOtp = ["", "", "", "", "", ""];
        setOtp(newOtp);
        alert("OTP Resent Successfully");
      } else {
        throw new Error("Failed to Send OTP");
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col p-6 justify-start text-white">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button className="text-white text-sm flex items-center">
          <ArrowLeft className="mr-2" />
          Back
        </button>
        <div className="text-xl font-bold">ONESTEP</div>
        <button className="text-gray-400">
          <X />
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
            <button
              onClick={() => handleResendOTP(params.id.toString())}
              className="text-yellow-600 font-semibold"
            >
              Resend OTP
            </button>
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
