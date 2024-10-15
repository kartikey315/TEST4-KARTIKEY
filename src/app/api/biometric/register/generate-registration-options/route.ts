import { generateRegistrationOptions } from "@simplewebauthn/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, id } = body;

  try {
    const encoder = new TextEncoder();
    const uint8Id = encoder.encode(id);
    const options = await generateRegistrationOptions({
      rpName: "OneStep",
      rpID: process.env.RP_ID!,
      userID: uint8Id,
      userName: username,
      attestationType: "none",
      authenticatorSelection: {
        residentKey: "required",
        userVerification: "required",
      },
    });

    return NextResponse.json({ options, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}
