import React, { useState } from "react";
import { Fingerprint, ScanFace } from "lucide-react";
import { LoginProps } from "./SocialLogin";
import SocialLoginWidget from "./SocialLoginWidget";
import PasscodeLoginWidget from "./PasscodeLoginWidget";
import { signIn } from "next-auth/react";
import axios from "axios";
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";

const BiometricLogin = ({ setCurrentLoginMethod }: LoginProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBiometricLogin = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex flex-col items-center justify-center min-w-screen">
      <div className="bg-black border-gray-800 border-2 text-white p-6 sm:p-8 max-w-[80%] min-h-[90%] rounded-lg shadow-md">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4">
          Login
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Access Wealth with either your OneStep Passcode, OneStep Biometrics or
          OneStep ID Verification
        </p>

        <div className="max-w-md mx-auto flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-2">ONESTEP BIOMETRICS</h3>
          <p className="text-gray-400 mb-4">
            Login to your Account made easy with the Onestep Biometrics
          </p>
          <p className="text-gray-400 mb-4 mt-4">
            KINDLY SELECT A METHOD BELOW
          </p>
          {loading ? (
            <ClipLoader color="#ca8a04" />
          ) : (
            <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 mb-4 gap-6 sm:gap-10">
              <div
                onClick={handleBiometricLogin}
                className="flex flex-col items-center gap-2 hover:cursor-pointer border-gray-700 border-2 p-4 px-10 rounded-md"
              >
                <Fingerprint size={48} className="text-yellow-600" />
                <h4>Touch Id</h4>
              </div>
              <div
                onClick={handleBiometricLogin}
                className="flex flex-col items-center gap-2 hover:cursor-pointer border-gray-700 border-2 p-4 px-10 rounded-md"
              >
                <ScanFace size={48} className="text-yellow-600" />
                <h4>Face Id</h4>
              </div>
            </div>
          )}

          <p className="text-gray-400 text-sm mb-2">
            Having trouble using OneStep Verification?
          </p>
          <button className="w-[80%] bg-yellow-600 text-black py-2 rounded font-semibold">
            HELP CENTRE
          </button>
        </div>

        <div className="flex items-center justify-center mt-14 mb-12">
          <div className="border-t border-gray-800 w-[40%] sm:w-[35%]"></div>
          <p className="text-center mx-2">OR</p>
          <div className="border-t border-gray-800 w-[40%] sm:w-[35%]"></div>
        </div>
        <div className="flex justify-center max-w-[100%]">
          <div className="flex flex-col sm:flex-row justify-between min-w-[60%] items-center gap-4">
            <SocialLoginWidget setCurrentLoginMethod={setCurrentLoginMethod} />
            <div className="border-l-2 hidden sm:block border-gray-800 sm:min-h-[40vh] mx-10 ml-32 text-black"></div>
            <PasscodeLoginWidget
              setCurrentLoginMethod={setCurrentLoginMethod}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricLogin;
