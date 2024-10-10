import { NextRequest, NextResponse } from "next/server";
// import { authenticator } from "otplib";

const otpStorage: Record<string, string> = {};

// const SECRET_KEY = process.env.OTP_GENERATION_SECRET_KEY;

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
      });
    }

    if (storedOtp === otp) {
      NextResponse.json({ message: "OTP verified successfully" });
    } else {
      NextResponse.json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error });
  }
}
