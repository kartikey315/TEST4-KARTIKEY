import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginProps } from "./SocialLogin";
import BiometricLoginWidget from "./BiometricLoginWidget";
import SocialLoginWidget from "./SocialLoginWidget";
import ClipLoader from "react-spinners/ClipLoader";

const PasscodeLogin = ({ setCurrentLoginMethod }: LoginProps) => {
  const router = useRouter();
  const [passcode, setPasscode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handlePasscodeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...passcode];
      newOtp[index] = value;
      setPasscode(newOtp);

      if (value && index < passcode.length - 1) {
        const nextInput = document.getElementById(
          `passcode-input-${index + 1}`
        );
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handlePasscodeLogin = async () => {
    if (passcode.includes("")) {
      alert("Please Enter Valid OTP");
      return;
    }
    try {
      setLoading(true);
      const signInData = await signIn("passcode-login", {
        redirect: false,
        passcode: passcode.join(""),
      });

      console.log(signInData);
      if (signInData?.ok) {
        alert("Signed In Succesfully");
        router.push("/dashboard");
      } else {
        alert("Sign In Failed ");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black flex flex-col justify-start">
      <div className="bg-black flex flex-col items-center justify-center min-w-screen">
        <div className="bg-black border-gray-800 border-2 text-white p-8 w-[1000px] max-h-[860px] rounded-lg shadow-md">
          <h1 className="text-4xl font-semibold text-center mb-4">Login</h1>
          <p className="text-center text-gray-400 mb-8">
            Access Wealth with either your OneStep Passcode, OneStep Biometrics
            or OneStep ID Verification
          </p>

          <div className="max-w-md mx-auto flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">ONESTEP PASSCODE</h3>
            <p className="text-gray-400 mb-4">
              Enter your Passcode to Log into your Account
            </p>

            <div className="flex justify-center gap-2 mb-6">
              {passcode.map((digit, index) => (
                <input
                  key={index}
                  id={`passcode-input-${index}`}
                  type="password"
                  className="bg-black border border-gray-600 w-14 h-14 text-center text-2xl rounded-md"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handlePasscodeChange(e, index)}
                />
              ))}
            </div>
            {loading ? (
              <ClipLoader color="#ca8a04" />
            ) : (
              <button
                onClick={handlePasscodeLogin}
                className="bg-yellow-600 text-black px-6 py-3 w-full rounded-md font-semibold"
              >
                PROCEED
              </button>
            )}
          </div>

          <p className="text-center text-gray-400">
            Can’t remember your Passcode?{" "}
            <button className="text-yellow-600 font-semibold">
              Reset Passcode
            </button>
          </p>

          <div className="flex items-center justify-center mt-14 mb-12">
            <div className="border-t border-gray-800  w-[40%]"></div>
            <p className="text-center mx-2">OR</p>
            <div className="border-t border-gray-800 w-[40%]"></div>
          </div>

          <div>
            <div className="flex justify-center items-center gap-4">
              <BiometricLoginWidget
                setCurrentLoginMethod={setCurrentLoginMethod}
              />
              <div className="border-l-2 border-gray-800 min-h-[40vh] min-w-2 text-black">
                k
              </div>
              <SocialLoginWidget
                setCurrentLoginMethod={setCurrentLoginMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasscodeLogin;
