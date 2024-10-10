"use client";

import React from "react";
import { ChevronLeft, X } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoginButton, TelegramAuthData } from "@telegram-auth/react";

const SignUpPage = () => {
  const router = useRouter();
  console.log(process.env.NEXT_PUBLIC_BOT_USERNAME);
  const sendOTP = async (data: TelegramAuthData) => {
    try {
      const res = await axios.post("/send-otp", { telegramId: data.id });

      if (res.data.status == "SUCCESS") {
        router.push("/otpVerifiaction");
      } else {
        alert("Failed to Send OTP");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-black text-white flex flex-col p-4 justify-start min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link href="/login" className="flex items-center text-sm">
          {" "}
          <ChevronLeft /> Back to Login
        </Link>

        <div className="text-xl font-bold">ONESTEP</div>
        <button className="text-gray-400">
          <X size={24} />
        </button>
      </div>

      <div className="bg-black text-white flex flex-col items-center justify-center p-4 min-h-screen">
        <div className="w-full max-w-md items-start">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Sign up</h1>
            <h2 className="text-xl mb-4">Complete OneStep Verification</h2>
            <p className="text-sm text-gray-400">
              Complete the OneStep verification to proceed, if you dont have one
              already. It is important for account verification
            </p>
          </div>

          <div className="text-center mb-8 flex flex-col items-center gap-2">
            <p className="mb-4">Kindly Enter Your Telegram Id</p>

            <LoginButton
              showAvatar={false}
              botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME!}
              onAuthCallback={(data) => sendOTP(data)}
            />
          </div>

          <div className="text-center mb-8">
            <p className="text-sm mb-2">
              Having trouble using OneStep Verification?
            </p>
            <button className="w-full bg-yellow-600 text-black py-2 rounded-md font-semibold">
              HELP CENTRE
            </button>
          </div>

          <p className="text-xs text-center text-gray-500 mb-4">
            If you have not yet registered for the Onestep ID, go to the
            recovery center to use the Seed phrase recovery with your seed
            phrase to gain access into your account
          </p>

          <p className="text-xs text-center text-gray-500">
            By using Login you agree to our{" "}
            <a href="#" className="text-yellow-600">
              Terms & Privacy Policy.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
