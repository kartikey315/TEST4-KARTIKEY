import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, username, dob, phonenumber, passcode } = body;

    const existingUserById = await prisma.user.findUnique({
      where: { id: id },
    });
    if (existingUserById) {
      return NextResponse.json(
        { user: null, message: "User with this id already exists" },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: { id, username, dob, phonenumber, passcode },
    });

    return NextResponse.json({
      user: newUser,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
