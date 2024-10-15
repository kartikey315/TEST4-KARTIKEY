import React from "react";
import { ArrowLeft, X, Fingerprint, ScanFace } from "lucide-react";
import { startRegistration } from "@simplewebauthn/browser";

import axios from "axios";
import { AccountDetails } from "../[id]/page";

interface BiometricsSetupParams {
  accountDetails: AccountDetails;
  setAccountDetails: (accountDetails: AccountDetails) => void;
}

const BiometricsSetup = ({
  accountDetails,
  setAccountDetails,
}: BiometricsSetupParams) => {
  const handleSetUpBiometrics = async () => {
    try {
      const username = accountDetails.username;
      const id = accountDetails.id;
      const response = await axios.post(
        "/api/biometric/register/generate-registration-options",
        { username, id }
      );
      const options = response.data.options;

      const credential = await startRegistration(options);

      const verifyResponse = await axios.post(
        "/api/biometric/register/verify-registration",
        {
          username,
          id,
          credential,
          options,
        }
      );
      console.log(verifyResponse);
      const verifyResult = verifyResponse.data.success;

      if (verifyResult) {
        alert("Registration successful!");
        setAccountDetails({
          ...accountDetails,
          biometricPassKey: verifyResponse.data.userPassKey,
        });
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error during registration");
    }
  };
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-4">
        <button className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">ONESTEP</h1>
        <button className="text-white">
          <X size={24} />
        </button>
      </header>

      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="bg-black border-gray-700 border-2 rounded-lg p-8 min-w-[90vh] max-w-md">
          <h2 className="text-3xl font-bold mb-2 text-center">
            Biometrics Registration
          </h2>
          <p className="text-center text-sm mb-4">
            REGISTER YOUR BIOMETRICS FOR FASTER LOIGIN. DO IT NOW OR LATER
          </p>
          <p className="text-center text-sm mb-8 text-gray-400">
            Register with Biometrics such as Touch ID, Face ID, and Pass Code
            for enhanced Login and Account Security.
          </p>
          <div className="border-t border-gray-700 mt-18"></div>
          <div className="flex justify-between mt-10 mx-10">
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full p-4 mb-2">
                <Fingerprint size={48} className="text-teal-400" />
              </div>
              <span className="text-sm">Touch ID</span>

              <button
                onClick={handleSetUpBiometrics}
                className="w-full bg-yellow-600 text-black p-2 rounded-md mb-4 mt-4"
              >
                SETUP TOUCH ID
              </button>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 rounded-full p-4 mb-2">
                <ScanFace size={48} />
              </div>
              <span className="text-sm">Face ID</span>
              <button
                onClick={handleSetUpBiometrics}
                className="w-full bg-yellow-600 text-black p-2 rounded-md mt-4"
              >
                SETUP FACE ID
              </button>
            </div>
          </div>
        </div>
        <footer className="p-4 text-center text-xs">
          <p>
            By using Login you agree to our{" "}
            <a href="#" className="text-yellow-600">
              Terms & Privacy Policy
            </a>
            .
          </p>
        </footer>
      </div>

      <div className="absolute bottom-4 right-4 flex space-x-2">
        <button className="bg-yellow-600 text-black px-4 py-2 rounded-md text-sm">
          Recovery Center
        </button>
      </div>
    </div>
  );
};

export default BiometricsSetup;
