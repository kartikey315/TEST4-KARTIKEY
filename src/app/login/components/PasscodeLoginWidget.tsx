import React from "react";
import { LoginProps } from "./SocialLogin";

const PasscodeLoginWidget = ({ setCurrentLoginMethod }: LoginProps) => {
  const handleChangeLoginMethod = (method: string) => {
    setCurrentLoginMethod(method);
  };

  return (
    <div className="bg-black p-4 rounded flex flex-col items-center">
      <h2 className="font-semibold mb-2 text-2xl">
        Use OneStep Passcode to Login
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        Use your OneStep Passcode to enjoy fast and Easy Logins
      </p>
      <div className="bg-black-700 w-14 h-14 rounded-lg flex items-center justify-center mb-2 mx-auto">
        <svg
          className="w-10 h-10"
          viewBox="0 0 24 24"
          fill="#ca8a04"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z" />
        </svg>
      </div>
      <span className="block text-center mb-4">Passcode</span>
      <button
        onClick={() => handleChangeLoginMethod("OnestepPasscode")}
        className="w-[62%] bg-purple-700 text-white py-2 rounded font-semibold mb-2"
      >
        OneStep Passcode
      </button>
      <p className="text-xs text-gray-400 mt-2 mb-4">
        Having Trouble using OnestepID Verification?
      </p>
      <button className="w-[62%] bg-yellow-600 text-black py-2 rounded font-semibold">
        HELP CENTER
      </button>
    </div>
  );
};

export default PasscodeLoginWidget;
