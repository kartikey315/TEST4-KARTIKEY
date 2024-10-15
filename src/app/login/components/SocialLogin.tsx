import React, { useState } from "react";
import { LoginButton } from "@telegram-auth/react";
import useSendOTP from "@/hooks/useSendOtp";
import BiometricLoginWidget from "./BiometricLoginWidget";
import PasscodeLoginWidget from "./PasscodeLoginWidget";
import OTPVerification from "./OTPVerification";
import ClipLoader from "react-spinners/ClipLoader";
export interface LoginProps {
  setCurrentLoginMethod: (method: string) => void;
}

const SocialLogin = ({ setCurrentLoginMethod }: LoginProps) => {
  const { sendOTP } = useSendOTP();
  const [otpSent, setOtpSent] = useState(false);
  const [telegramId, setTelegramID] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTelegramLogin = async (telegramId: string) => {
    try {
      setLoading(true);
      const success = await sendOTP({ telegramId });

      if (success) {
        setTelegramID(telegramId);
        setOtpSent(true);
      } else {
        alert("Failed to send OTP for login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!otpSent ? (
        <div className="bg-black flex flex-col items-center justify-center min-w-full">
          <div className="bg-black border-gray-800 border-2 text-white p-6 sm:p-8 max-w-[80%] min-h-[90%] rounded-lg shadow-md">
            <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4">
              Login
            </h1>
            <p className="text-center text-gray-400 mb-8">
              Access Wealth with either your OneStep Passcode, OneStep
              Biometrics or OneStep ID Verification
            </p>

            <h2 className="text-lg font-semibold text-center mb-2">
              USE ONESTEP ID TO LOGIN
            </h2>
            <p className="text-center text-gray-400 mb-6">
              Use the Onestep Verification to Log into your Account
            </p>
            <div className="flex justify-center mb-6">
              {loading ? (
                <ClipLoader color="#ca8a04" />
              ) : (
                <LoginButton
                  showAvatar={false}
                  botUsername={process.env.NEXT_PUBLIC_BOT_USERNAME!}
                  onAuthCallback={(data) =>
                    handleTelegramLogin(data.id.toString())
                  }
                />
              )}
            </div>

            <div className="flex items-center justify-center mt-14 mb-12">
              <div className="border-t border-gray-800 w-[40%] sm:w-[35%]"></div>
              <p className="text-center mx-2">OR</p>
              <div className="border-t border-gray-800 w-[40%] sm:w-[35%]"></div>
            </div>
            <div className="flex justify-center max-w-[100%]">
              <div className="flex flex-col sm:flex-row justify-between min-w-[60%] items-center gap-4">
                <BiometricLoginWidget
                  setCurrentLoginMethod={setCurrentLoginMethod}
                />
                <div className="border-l-2 hidden sm:block border-gray-800 sm:min-h-[40vh] mx-10 text-black"></div>
                <PasscodeLoginWidget
                  setCurrentLoginMethod={setCurrentLoginMethod}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <OTPVerification telegramId={telegramId} />
      )}
    </div>
  );
};

export default SocialLogin;
