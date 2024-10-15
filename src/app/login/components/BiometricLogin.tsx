import React from "react";
import { Fingerprint, ScanFace } from "lucide-react";
import { LoginProps } from "./SocialLogin";
import SocialLoginWidget from "./SocialLoginWidget";
import PasscodeLoginWidget from "./PasscodeLoginWidget";
import { signIn } from "next-auth/react";
import axios from "axios";
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";

const BiometricLogin = ({ setCurrentLoginMethod }: LoginProps) => {
  const router = useRouter();

  const handleBiometricLogin = async () => {
    try {
      const res = await axios.get(
        "/api/biometric/auth/generate-authentication-options"
      );

      const options = res.data.authenticationOptions;
      const assertionResponse = await startAuthentication(options);

      const verificationResult = await axios.post(
        "/api/biometric/auth/verify-authentication",
        {
          assertionResponse: assertionResponse,
          currentOptions: options,
        }
      );
      if (verificationResult.data.success) {
        alert("Welcome " + verificationResult.data.user.username);
      } else {
        alert("Biometric LogIn Failed");
      }

      const signInData = await signIn("biometric-login", {
        redirect: false,
        id: verificationResult.data.user.id,
      });

      if (signInData?.ok) {
        alert("Signed In Succesfully");
        router.push("/dashboard");
      } else {
        alert("Sign In Failed ");
      }
    } catch (error) {
      alert("BioMetric Login Failed");
      console.log(error);
    }
  };

  return (
    <div className="bg-black flex flex-col justify-start">
      <div className="bg-black flex flex-col items-center justify-center min-w-screen">
        <div className="bg-black border-gray-800 border-2 text-white p-8 w-[1000px] max-h-[960px] rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-center mb-4">Login</h1>
          <p className="text-center text-gray-400 mb-8">
            Access Wealth with either your OneStep Passcode, OneStep Biometrics
            or OneStep ID Verification
          </p>
          <div className="max-w-md mx-auto flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">
              USE ONESTEP BIOMETRICS TO LOGIN
            </h3>
            <p className="text-gray-400 mb-4">
              Login to your Account made easy with the Onestep Biometrics
            </p>
            <p className="text-gray-400 mb-4 mt-4">
              KINDLY SELECT A METHOD BELOW
            </p>
            <div className="flex justify-center space-x-4 mb-4 gap-10">
              <div
                onClick={handleBiometricLogin}
                className="flex flex-col items-center gap-2 hover:cursor-pointer border-gray-700 border-2 p-4 px-10 rounded-md"
              >
                <Fingerprint size={48} className="text-yellow-600" />
                <h4>Touch Id</h4>
              </div>
              <div
                onClick={handleBiometricLogin}
                className="flex flex-col items-center gap-2 hover:cursor-pointer border-gray-700 border-2 p-4 px-10  rounded-md"
              >
                <ScanFace size={48} className="text-yellow-600" />
                <h4>Face Id</h4>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-2">
              Having trouble using OneStep Verification?
            </p>
            <button className="w-full bg-yellow-600 text-black py-2 rounded font-semibold">
              HELP CENTRE
            </button>
          </div>

          <div className="flex items-center justify-center mt-14 mb-12">
            <div className="border-t border-gray-800  w-[40%]"></div>
            <p className="text-center mx-2">OR</p>
            <div className="border-t border-gray-800  w-[40%]"></div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <SocialLoginWidget setCurrentLoginMethod={setCurrentLoginMethod} />
            <div className="border-l-2 border-gray-800 min-h-[40vh] min-w-2 text-black">
              k
            </div>
            <PasscodeLoginWidget
              setCurrentLoginMethod={setCurrentLoginMethod}
            />
          </div>
        </div>
      </div>
      <button className="fixed bottom-4 right-4 bg-yellow-600 text-black p-2 rounded-full flex items-center">
        <span className="mr-2">Recovery Center</span>
      </button>
    </div>
  );
};

export default BiometricLogin;
