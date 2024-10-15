import React from "react";
import { Fingerprint, ScanFace } from "lucide-react";
import { LoginProps } from "./SocialLogin";

const BiometricLoginWidget = ({ setCurrentLoginMethod }: LoginProps) => {
  const handleChangeLoginMethod = (method: string) => {
    setCurrentLoginMethod(method);
  };

  return (
    <div className="bg-black p-4 rounded flex flex-col items-center max-w-[60vh]">
      <h2 className="font-semibold mb-2 text-2xl">
        Use Onestep Biometrics to Login
      </h2>
      <p className="text-xs text-gray-400 mb-4">
        Login into your Account made easy with the Onestep Biometrics
      </p>
      <div className="flex justify-center space-x-4 mb-4 gap-10">
        <div className="flex flex-col items-center gap-2">
          <Fingerprint size={48} className="text-yellow-600" />
          <h4>Touch Id</h4>
        </div>
        <div className="flex flex-col items-center gap-2">
          <ScanFace size={48} className="text-yellow-600" />
          <h4>Face Id</h4>
        </div>
      </div>
      <button
        onClick={() => handleChangeLoginMethod("OnestepBiometrics")!}
        className="w-[50%] bg-purple-600 text-white py-2 rounded font-semibold"
      >
        Onestep Biometrics
      </button>
      <p className="text-xs text-gray-400 mt-4 mb-4">
        Having Trouble using Biometric Verification?
      </p>
      <button className="w-[62%] bg-yellow-600 text-black py-2 rounded font-semibold">
        HELP CENTER
      </button>
    </div>
  );
};

export default BiometricLoginWidget;
