import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  ArrowLeft,
  X,
  User,
  Calendar,
  RefreshCcw,
  Info,
  PhoneCall,
} from "lucide-react";
import { AccountDetails } from "../[id]/page";

interface FormErrors {
  username?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
}

interface AccountSetupParams {
  accountDetails: AccountDetails;
  setAccountDetails: (accountDetails: AccountDetails) => void;
}

const AccountSetup = ({
  accountDetails,
  setAccountDetails,
}: AccountSetupParams) => {
  const [formData, setFormData] = useState({
    username: "",
    dateOfBirth: "",
    phoneNumber: "",
    referralCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    console.log(formData);
    if (!formData.username || formData.username.length > 8) {
      newErrors.username =
        "Username is required and must be up to 8 characters";
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      accountDetails.dateOfBirth = formData.dateOfBirth;
      accountDetails.phoneNumber = formData.phoneNumber;
      accountDetails.username = formData.username;
      accountDetails.referralCode = formData.referralCode;
      setAccountDetails({
        ...accountDetails,
        username: formData.username,
        dateOfBirth: formData.dateOfBirth,
        phoneNumber: formData.phoneNumber,
        referralCode: formData.referralCode,
      });
    }
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
        <div className="bg-black border-gray-700 border-2 text-center rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-2">Setup your Account</h1>
          <p className="text-gray-400 mb-8">
            Enter your Username, Date of Birth, and Phone Number below
          </p>

          <div className="flex mb-8">
            <div className="flex items-center mr-8">
              <div className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center mr-2">
                1
              </div>
              <div>
                <div className="font-bold">Account Setup</div>
                <div className="text-sm text-gray-400">
                  Enter your Account Information
                </div>
              </div>
            </div>
            <div className="flex items-center opacity-50">
              <div className="bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                2
              </div>
              <div>
                <div className="font-bold">Setup Passcode</div>
                <div className="text-sm text-gray-400">
                  Secure your Account using OneStep Passcode
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="text-start">
            <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
              <label className="text-sm font-bold mb-2 text-gray-500">
                USERNAME
              </label>
              <div className="flex">
                <User className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  value={formData?.username}
                  onChange={handleChange}
                  className="bg-transparent w-full outline-none"
                />
              </div>
            </div>
            {errors?.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
            <p className="text-xs text-gray-400 mt-2 mb-2">
              Must be up to 8 characters and unique
            </p>

            <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
              <label className="text-sm font-bold mb-2 text-gray-500">
                DATE OF BIRTH
              </label>
              <div className="flex">
                <Calendar className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="dateOfBirth"
                  value={formData?.dateOfBirth}
                  onChange={handleChange}
                  placeholder="dd/mm/yy"
                  className="bg-transparent w-full outline-none"
                />
              </div>
              {errors?.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
              <label className="text-sm font-bold mb-2 text-gray-500">
                PHONE NUMBER
              </label>
              <div className="flex">
                <PhoneCall className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData?.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-transparent w-full outline-none"
                />
              </div>
              {errors?.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>

            <p className="text-gray-400 mb-4">
              Optionally, Input Referral & Promo Codes
            </p>

            <div className="flex items-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-8">
              <RefreshCcw className="text-gray-400 mr-2" />
              <input
                type="text"
                name="referralCode"
                value={formData?.referralCode}
                onChange={handleChange}
                placeholder="Enter referral code"
                className="bg-transparent w-full outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 text-black font-bold py-3 rounded mb-4"
            >
              PROCEED
            </button>

            <div className="flex items-start text-xs text-gray-400">
              <Info className="flex-shrink-0 mr-2 mt-1" size={16} />
              <p>
                NOTE: Provide correct information relation to yourself, Your
                Phone Number and other details as they will be used for
                authentication, authorization, and verification before payments
                and other essential support services are made.
              </p>
            </div>
          </form>
        </div>

        <footer className="text-center text-sm text-gray-400 mt-4">
          By using Login you agree to our Terms & Privacy Policy.
        </footer>
      </div>
    </div>
  );
};

export default AccountSetup;
