"use client";

import React, { useState } from "react";
import AccountSetup from "../components/AccountSetup";
import PasscodeSetup from "../components/PasscodeSetup";
import BiometricsSetup from "../components/BiometricSetup";

export interface AccountDetails {
  id: string;
  username?: string;
  dateOfBirth?: string;
  phoneNumber?: string;
  passcode?: string;
  referralCode?: string;
  biometricPassKey?: object;
}

interface RegisterProps {
  params: { id: string };
}

const Register = ({ params }: RegisterProps) => {
  const [accountDetails, setAccountDetails] = useState<AccountDetails>({
    id: params.id,
  });

  console.log(accountDetails);

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
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Register;
