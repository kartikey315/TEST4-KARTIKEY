import { otpStorage } from "@/lib/localDb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { telegramId, otp } = await req.json();

    if (!telegramId || !otp) {
      return NextResponse.json({
        message: "Telegram ID and OTP are required.",
      });
    }

    const storedOtp = otpStorage[telegramId];

    if (!storedOtp) {
      return NextResponse.json({
        message: "No OTP found for this Telegram ID.",
        status: "FAILED",
      });
    }

    if (storedOtp === otp) {
      return NextResponse.json({
        message: "OTP verified successfully",
        status: "SUCCESS",
      });
    } else {
      return NextResponse.json({ message: "Invalid OTP", status: "FAILED" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
