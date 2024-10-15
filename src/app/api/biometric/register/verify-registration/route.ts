import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";
import { NextRequest, NextResponse } from "next/server";

export interface Passkey {
  webAuthnUserID: string;
  credentialid: string;
  publicKey: string;
  counter: number;
  deviceType: string;
  backedUp: boolean;
  transports: string[];
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { credential, options } = body;

  try {
    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: options.challenge,
      expectedOrigin: "http://localhost:3000",
      expectedRPID: "localhost",
    });

    if (verification.verified) {
      const { registrationInfo } = verification;
      const {
        credentialID,
        credentialPublicKey,
        counter,
        credentialDeviceType,
        credentialBackedUp,
      } = registrationInfo!;

      console.log(credentialPublicKey);

      const newPasskey: Passkey = {
        webAuthnUserID: options.user.id,
        credentialid: credentialID,
        publicKey: isoBase64URL.fromBuffer(credentialPublicKey),
        counter,
        deviceType: credentialDeviceType,
        backedUp: credentialBackedUp,
        transports: credential.response.transports,
      };

      return NextResponse.json({ userPassKey: newPasskey, success: true });
    }
    console.log(verification);
    return NextResponse.json({ success: false });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
