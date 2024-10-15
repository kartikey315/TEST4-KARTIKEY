import React, { FormEvent, useState } from "react";
import { Mail, ChevronDown, ArrowLeft, X } from "lucide-react";
import { AccountDetails } from "../[id]/page";

interface KYCSetupParams {
  accountDetails: AccountDetails;
  setAccountDetails: (accountDetails: AccountDetails) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
  address2: string;
}

const KYCSetup = ({ accountDetails, setAccountDetails }: KYCSetupParams) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
    address2: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("Form submitted with data:", formData);

      setAccountDetails({ ...accountDetails, kycData: formData });

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    }
  };

  const handlePrevious = () => {
    setAccountDetails({ ...accountDetails, biometricPassKey: undefined });
  };

  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <header className="flex justify-between items-center p-4">
        <button className="text-white">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">ONESTEP</h1>
        <button className="text-white">
          <X size={24} />
        </button>
      </header>

      <div className="bg-gray-950 rounded-lg p-6 mb-6 mt-10 ml-32 w-[120vh]">
        <h1 className="text-2xl font-bold mb-6">Complete your Profile</h1>
        <h2 className="text-lg font-semibold mb-4 mt-18">
          Step 1: Personal Info
        </h2>

        <p className="text-yellow-500 text-sm mb-6">
          <span className="mr-2">⚠️</span>
          Carefully fill the form below. Please ensure to input your authentic
          information only
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
            <label className="text-sm font-bold mb-2 text-gray-500">
              FIRST NAME
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full bg-gray-700 rounded-md p-2"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
            <label className="text-sm font-bold mb-2 text-gray-500">
              LAST NAME
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full bg-gray-700 rounded-md p-2"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
            <label className="text-sm font-bold mb-2 text-gray-500">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full bg-gray-700 rounded-md p-2 pl-8"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Mail className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
            <label className="text-sm font-bold mb-2 text-gray-500">
              COUNTRY OF RESIDENCE
            </label>
            <div className="relative">
              <select
                id="country"
                name="country"
                className="w-full bg-gray-700 rounded-md p-2 appearance-none"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="United States">United States</option>
              </select>
              <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
            <label className="text-sm font-bold mb-2 text-gray-500">
              CITY OF RESIDENCE
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full bg-gray-700 rounded-md p-2"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
            <label className="text-sm font-bold mb-2 text-gray-500">
              ADDRESS
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="w-full bg-gray-700 rounded-md p-2"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
            <label className="text-sm font-bold mb-2 text-gray-500">
              ZIP/POSTAL CODE
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className="w-full bg-gray-700 rounded-md p-2"
              value={formData.zipCode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex flex-col justify-center bg-black border-gray-700 border-2 rounded px-3 py-2 mb-4">
            <label className="text-sm font-bold mb-2 text-gray-500">
              ADDRESS #2 (OPTIONAL)
            </label>
            <input
              type="text"
              id="address2"
              name="address2"
              className="w-full bg-gray-700 rounded-md p-2"
              value={formData.address2}
              onChange={handleInputChange}
            />
          </div>

          <button
            onClick={handlePrevious}
            className="px-4 py-2 bg-gray-950 border-gray-700 border-2 rounded-md w-[55vh]"
          >
            PREVIOUS
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-black rounded-md w-[55vh]"
          >
            NEXT
          </button>
        </form>
      </div>

      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 mr-32">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
            1
          </div>
          <div className="text-sm">Personal Information</div>
          <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
            2
          </div>
          <div className="text-sm">Verify your Identity</div>
          <div className="w-8 h-8 rounded-full bg-gray-900  flex items-center justify-center">
            3
          </div>
          <div className="text-sm">Photo Selfie with ID</div>
        </div>
      </div>
    </div>
  );
};

export default KYCSetup;
