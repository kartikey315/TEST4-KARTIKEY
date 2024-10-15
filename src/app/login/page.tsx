"use client";

import React, { useState } from "react";
import SocialLogin from "./components/SocialLogin";
import PasscodeLogin from "./components/PasscodeLogin";
import BiometricLogin from "./components/BiometricLogin";
import Link from "next/link";

const Login = () => {
  const [currentLoginMethod, setCurrentLoginMethod] = useState("OnestepID");

  return (
    <div className="bg-black min-h-screen min-w-screen flex flex-col pt-4">
      <div className="flex items-center justify-center mb-8 text-white min-w-full">
        <div className="text-xl font-bold">ONESTEP</div>
      </div>
      {currentLoginMethod == "OnestepID" ? (
        <SocialLogin setCurrentLoginMethod={setCurrentLoginMethod} />
      ) : currentLoginMethod == "OnestepPasscode" ? (
        <PasscodeLogin setCurrentLoginMethod={setCurrentLoginMethod} />
      ) : (
        <BiometricLogin setCurrentLoginMethod={setCurrentLoginMethod} />
      )}
      <div className="flex flex-col items-center mt-6 text-center justify-start min-w-full">
        <div className="text-center text-sm text-gray-400">
          <p>
            By using Login you agree to our{" "}
            <a href="#" className="text-yellow-600 hover:underline">
              Terms
            </a>{" "}
            &{" "}
            <a href="#" className="text-yellow-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <p className="text-gray-400 mb-2 ">Are you new Here?</p>
        <div className="w-[24%] bg-yellow-600 text-black py-2 rounded font-semibold mb-4">
          <Link href="/signup">SIGN UP</Link>
        </div>
      </div>
      <button className="fixed bottom-4 right-4 bg-yellow-600 text-black p-2 rounded-full flex items-center">
        <span className="mr-2">Recovery Center</span>
      </button>
    </div>
  );
};

export default Login;
