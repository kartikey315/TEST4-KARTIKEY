import Link from "next/link";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";

const Login = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col justify-start">
      <div className="flex justify-between items-center mb-8 text-white">
        <button className="flex items-center text-sm ">
          <svg
            className="w-4 h-4 mr-2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Create Account
        </button>
        <div className="text-xl font-bold">ONESTEP</div>
        <button className="text-gray-400">
          <X size={24} />
        </button>
      </div>
      <div className="bg-black flex flex-col items-center justify-center min-w-screen">
        <div className="bg-black border-gray-700 border-2 text-white p-8 max-w-[800px] max-h-[480px] rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-center mb-4">Login</h1>
          <p className="text-center text-gray-400 mb-8">
            Access Wealth with either your OneStep Passcode, OneStep Biometrics
            or OneStep ID Verification
          </p>

          <h2 className="text-lg font-semibold text-center mb-2">
            USE ONESTEP ID TO LOGIN
          </h2>
          <p className="text-center text-gray-400 mb-6">
            Use the Onestep Verification to Log into your Account
          </p>

          <div className="flex justify-center mb-6">
            <Link
              href="/otpVerification"
              className="bg-yellow-600 transition-colors hover:bg-yellow-800 p-4 rounded-lg"
            >
              <Image
                src="/telegram-512.png"
                alt="Telegram"
                width={12}
                height={12}
                className="w-12 h-12"
              />
            </Link>
          </div>

          <div className="text-center mb-8">
            <a
              href="/recovery-center"
              className="text-yellow-600 mb-2 inline-block"
            >
              Recovery Center
            </a>
            <p className="text-gray-400 mb-4">
              Having trouble using OneStep Verification?
            </p>
            <button className="bg-yellow-600 transition-colors hover:bg-yellow-800 text-black px-6 py-2 rounded-sm min-w-[400px] font-semibold">
              HELP CENTRE
            </button>
          </div>
        </div>
        <div className="text-center mt-4 flex flex-col items-center text-gray-500 text-sm w-[780px] h-[100px]">
          <p>
            By using Login you agree to our{" "}
            <a href="/terms" className="text-yellow-600">
              Terms & Privacy Policy
            </a>
            .
          </p>
          <p className="my-4">Are you new here?</p>
          <Link
            href="/signup"
            className="px-4 py-2 bg-yellow-600 transition-colors hover:bg-yellow-800 rounded-sm font-bold w-[400px] text-black"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
