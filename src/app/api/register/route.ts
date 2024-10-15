import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { accountDetails } = body;

    const existingUserById = await prisma.user.findUnique({
      where: { id: accountDetails.id },
    });
    if (existingUserById) {
      return NextResponse.json(
        { user: null, message: "User with this id already exists" },
        { status: 409 }
      );
    }

    const {
      id,
      username,
      dateOfBirth,
      phoneNumber,
      passcode,
      referralCode,
      biometricPassKey,
      kycData,
    } = accountDetails;

    const newUser = await prisma.user.create({
      data: {
        id,
        username,
        dob: dateOfBirth,
        phonenumber: phoneNumber,
        passcode,
        referralCode,
        biometricPassKeys: {
          create: {
            webAuthnUserID: biometricPassKey.webAuthnUserID,
            credentialid: biometricPassKey.credentialid,
            publicKey: biometricPassKey.publicKey,
            counter: biometricPassKey.counter,
            deviceType: biometricPassKey.deviceType,
            backedUp: biometricPassKey.backedUp,
            transports: biometricPassKey.transports,
          },
        },
        firstName: kycData.firstName,
        lastName: kycData.lastName,
        email: kycData.email,
        country: kycData.country,
        city: kycData.city,
        address: kycData.address,
        zipCode: kycData.zipCode,
        address2: kycData.address2,
        kycStatus: "PENDING",
      },
    });

    return NextResponse.json({
      user: newUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error });
  }
}
