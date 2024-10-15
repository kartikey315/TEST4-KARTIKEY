import React from "react";
import Image from "next/image";
import { LoginProps } from "./SocialLogin";

const SocialLoginWidget = ({ setCurrentLoginMethod }: LoginProps) => {
  const handleChangeLoginMethod = (method: string) => {
    setCurrentLoginMethod(method);
  };

  return (
    <div className="bg-black p-4 rounded flex flex-col items-center w-[50vh] mr-10">
      <h2 className="font-semibold mb-2 text-2xl">Use Onestep ID to Login</h2>
      <p className="text-xs text-gray-400 mb-4">
        Use your Onestep ID to login to your ECU Account
      </p>
      <p className="font-semibold mb-2 mt-6">Kindly select a Messenger</p>
      <div
        onClick={() => handleChangeLoginMethod("OnestepID")!}
        className="flex gap-2 mb-4 hover:cursor-pointer"
      >
        <Image
          src="/google.png"
          alt="google"
          width={24}
          height={24}
          className="bg-yellow-600"
        />
        <Image
          src="/X.png"
          alt="x"
          width={24}
          height={24}
          className="bg-yellow-600"
        />
        <Image
          src="/tiktok1.png"
          alt="tiktok"
          width={24}
          height={24}
          className="bg-yellow-600"
        />
        <Image
          src="/telegram-512.png"
          alt="Telegram"
          width={24}
          height={24}
          className="bg-yellow-600"
        />
        <Image
          src="/facebook.png"
          alt="facebook"
          width={24}
          height={24}
          className="bg-yellow-600"
        />
        <Image
          src="/line.png"
          alt="Line"
          width={24}
          height={24}
          className="bg-yellow-600"
        />
        <Image
          src="/whatsapp.png"
          alt="whatsapp"
          width={24}
          height={24}
          className="bg-yellow-600"
        />
      </div>
      <a href="#" className="text-gray-400 text-xs mb-6 ml-32">
        Recovery Centre
      </a>

      <p className="text-xs text-gray-400 mt-4 mb-4">
        Having Trouble using Biometric Verification?
      </p>
      <button className="w-[62%] bg-yellow-600 text-black py-2 rounded font-semibold">
        HELP CENTER
      </button>
    </div>
  );
};

export default SocialLoginWidget;
