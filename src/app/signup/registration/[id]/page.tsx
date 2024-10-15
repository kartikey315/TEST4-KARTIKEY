/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState } from "react";
import AccountSetup from "../components/AccountSetup";
import PasscodeSetup from "../components/PasscodeSetup";
import BiometricsSetup from "../components/BiometricSetup";
import KYCSetup from "../components/KYCSetup";
import { useRouter } from "next/navigation";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export interface AccountDetails {
  id: string;
  username?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  passcode?: string;
  referralCode?: string;
  biometricPassKey?: object;
  kycData?: object;
}

interface RegisterProps {
  params: { id: string };
}

const Register = ({ params }: RegisterProps) => {
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    id: params.id,
  });
  const [isReadyToRegister, setIsReadyToRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Registering User..");
  const router = useRouter();

  useEffect(() => {
    if (
      accountDetails.username &&
      accountDetails.passcode &&
      accountDetails.biometricPassKey &&
      accountDetails.kycData
    ) {
      setIsReadyToRegister(true);
    }
  }, [accountDetails]);

  const registerUser = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/register", { accountDetails });
      console.log(res);
      if (res.data.success) {
        setMessage("User Registered Successfully");
        router.push("/login");
      } else {
        alert("User Registration Failed");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isReadyToRegister) {
      registerUser();
    }
  }, [isReadyToRegister]);

  return (
    <div>
      {!accountDetails.username ? (
        <AccountSetup
          accountDetails={accountDetails}
          setAccountDetails={setAccountDetails}
        />
      ) : !accountDetails.passcode ? (
        <PasscodeSetup
          accountDetails={accountDetails}
          setAccountDetails={setAccountDetails}
        />
      ) : !accountDetails.biometricPassKey ? (
        <BiometricsSetup
          accountDetails={accountDetails}
          setAccountDetails={setAccountDetails}
        />
      ) : !accountDetails.kycData ? (
        <KYCSetup
          accountDetails={accountDetails}
          setAccountDetails={setAccountDetails}
        />
      ) : (
        <div className="bg-black min-h-screen items-center justify-center flex flex-col">
          {!loading ? (
            <h1 className="text-4xl font-bold mb-2 text-white text-center">
              {message} <ClipLoader />
            </h1>
          ) : (
            <h1 className="text-4xl font-bold mb-2 text-white text-center">
              {message}
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Register;
