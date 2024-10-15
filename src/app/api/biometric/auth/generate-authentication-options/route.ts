import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const authenticationOptions = await generateAuthenticationOptions({
      rpID: process.env.RP_ID!,
      allowCredentials: [], // This is left empty to allow any discoverable credential to be used
      userVerification: "required",
    });

    return NextResponse.json({ authenticationOptions, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}
