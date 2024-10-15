/* eslint-disable @typescript-eslint/no-explicit-any */

import { prisma } from "@/lib/prisma";
import { verifyAuthenticationResponse } from "@simplewebauthn/server";
import { NextRequest, NextResponse } from "next/server";
import { isoBase64URL } from "@simplewebauthn/server/helpers";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { assertionResponse, currentOptions } = body;
  try {
    const credentialId = assertionResponse.id;
    const userPasskey = await prisma.bioMetricPassKey.findUnique({
      where: { credentialid: credentialId },
    });
    if (!userPasskey) {
      return NextResponse.json({ message: "User Not Found", success: false });
    }

    const rpID = process.env.RP_ID!;
    const origin = process.env.RP_ORIGIN!;
    const publicKey = isoBase64URL.toBuffer(userPasskey.publicKey);
    const transports: any = userPasskey.transports;
    const verification = await verifyAuthenticationResponse({
      response: assertionResponse,
      expectedChallenge: currentOptions.challenge,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        credentialID: credentialId,
        credentialPublicKey: publicKey,
        counter: userPasskey!.counter,
        transports: transports,
      },
      requireUserVerification: false,
    });

    const { verified } = verification;
    const { authenticationInfo } = verification;
    const { newCounter } = authenticationInfo;
    if (verified) {
      await prisma.bioMetricPassKey.update({
        where: { credentialid: credentialId },
        data: { counter: newCounter },
      });
      const user = await prisma.user.findUnique({
        where: { id: userPasskey.userId },
      });
      console.log("CHECK SERVER");
      return NextResponse.json({ user: user, success: true });
    }
    return NextResponse.json({ success: false });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}
