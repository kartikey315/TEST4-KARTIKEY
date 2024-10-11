import { verifyRegistrationResponse } from "@simplewebauthn/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, id, credential, options } = body;

  try {
    const verification = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: options.challenge, // replace with real challenge
      expectedOrigin: "https://test-4-kartikey.vercel.app",
      expectedRPID: "test-4-kartikey.vercel.app",
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

      const user = { id: id, username: username };

      const newPasskey = {
        user,
        webAuthnUserID: options.user.id,
        id: credentialID,
        publicKey: credentialPublicKey,
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
