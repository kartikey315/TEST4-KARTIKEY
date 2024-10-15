import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { telegramId, otp } = await req.json();

    if (!telegramId || !otp) {
      return NextResponse.json({
        message: "Telegram ID and OTP are required.",
      });
    }

    const otpRecord = await prisma.oTP.findFirst({
      where: {
        id: telegramId,
        otp,
      },
    });

    if (!otpRecord) {
      return NextResponse.json({
        message: "No OTP found for this Telegram ID.",
        status: "FAILED",
      });
    }

    if (otpRecord.otp === otp) {
      if (new Date(otpRecord.expiresAt).getTime() > Date.now()) {
        return NextResponse.json({
          message: "OTP verified successfully",
          status: "SUCCESS",
        });
      } else {
        return NextResponse.json({
          message: "OTP Expired",
          status: "FAILED",
        });
      }
    } else {
      return NextResponse.json({ message: "Invalid OTP", status: "FAILED" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
