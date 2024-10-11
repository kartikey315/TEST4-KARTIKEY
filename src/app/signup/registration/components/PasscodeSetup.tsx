import React, { useState } from "react";
import { ArrowLeft, X, Check, Lock, Info } from "lucide-react";
import { AccountDetails } from "../[id]/page";

interface PasscodeSetupParams {
  accountDetails: AccountDetails;
  setAccountDetails: (accountDetails: AccountDetails) => void;
}

const PasscodeSetup = ({
  accountDetails,
  setAccountDetails,
}: PasscodeSetupParams) => {
  const [passcode, setPasscode] = useState("");
  const [errors, setErrors] = useState("");

  const handleProceed = () => {
    if (passcode != "" && errors == "") {
      accountDetails.passcode = passcode;
      setAccountDetails({
        ...accountDetails,
        passcode: passcode,
      });
      console.log(accountDetails);
    }
  };

  const handlePrevious = () => {
    if (passcode != "" && errors == "") {
      accountDetails.username = undefined;
      accountDetails.dateOfBirth = undefined;
      accountDetails.phoneNumber = undefined;
      accountDetails.referralCode = undefined;
      setAccountDetails(accountDetails);
    }
  };

  const handleInput = (pass: string) => {
    if (accountDetails.dateOfBirth!.includes(pass)) {
      setErrors("Your Passcode contains information about your DOB");
    } else {
      setErrors("");
    }
    setPasscode(pass);
  };

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <header className="flex justify-between items-center mb-8">
        <button className="flex items-center">
          <ArrowLeft className="mr-2" />
          Back
        </button>
        <div className="text-xl font-bold">ONESTEP</div>
        <button>
          <X />
        </button>
      </header>
      <div className="max-w-2xl mx-auto">
        <div className="bg-black border-gray-700 border-2 rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-2 text-center">
            Setup your Passcode
          </h1>
          <p className="text-gray-400 mb-8 text-center">
            You need to setup your OneStep passcode to properly keep your
            account completely safe and secured from the prying eyes of hackers
          </p>

          <div className="flex mb-8">
            <div className="flex items-center mr-8">
              <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-2">
                <Check size={20} />
              </div>
              <div>
                <div className="font-bold">Account Setup</div>
                <div className="text-sm text-gray-400">
                  Enter your Account Information
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-2">
                2
              </div>
              <div>
                <div className="font-bold">Transaction Request Form</div>
                <div className="text-sm text-gray-400">
                  Secure your Account using OneStep Passcode
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-2">
            <label className="text-sm font-bold mb-2 text-gray-500">
              PASSCODE
            </label>
            <div className="flex items-center bg-black rounded px-3 py-2">
              <Lock className="text-gray-400 mr-2" />
              <input
                type="password"
                value={passcode}
                onChange={(e) => handleInput(e.target.value)}
                placeholder="Enter Passcode"
                className="bg-transparent w-full outline-none text-white"
              />
            </div>
            {errors && <p className="text-red-500 text-xs mt-1">{errors}</p>}
          </div>
          <p className="text-xs text-gray-400 mt-1 mb-4">
            Your Passcode must not be related to your Date of Birth in any way
          </p>
          <div className="flex space-x-4 mb-8">
            <button
              onClick={handlePrevious}
              className="flex-1 border border-gray-600 text-white py-2 rounded"
            >
              PREVIOUS
            </button>
            <button
              onClick={handleProceed}
              className="flex-1 bg-yellow-600 text-black font-bold py-2 rounded"
            >
              PROCEED
            </button>
          </div>

          <div className="flex items-start text-xs text-gray-400">
            <Info className="flex-shrink-0 mr-2 mt-1" size={16} />
            <p>
              NOTE: Provide correct information relation to yourself, Your Phone
              Number and other details as they will be used for authentication,
              authorization, and verification before payments and other
              essential support services are made.
            </p>
          </div>
        </div>

        <footer className="text-center text-sm text-gray-400 mt-4">
          By using Login you agree to our{" "}
          <span className="text-yellow-600">Terms & Privacy Policy</span>.
        </footer>
      </div>
    </div>
  );
};

export default PasscodeSetup;
