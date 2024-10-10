import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { authenticator } from "otplib";

const otpStorage: Record<string, string> = {};

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SECRET_KEY = process.env.OTP_GENERATION_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    const { telegramId } = await req.json();

    if (!telegramId) {
      return NextResponse.json({ message: "Telegram ID is required." });
    }
    console.log("check1");
    const otp = authenticator.generate(SECRET_KEY!);

    otpStorage[telegramId] = otp;

    const message = `Your OTP for verification is: ${otp}`;
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await axios.post(telegramUrl, {
      chat_id: telegramId,
      text: message,
    });

    NextResponse.json({ message: "OTP sent successfully", status: "SUCCESS" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    NextResponse.json({ message: "Failed to send OTP", status: "FAILED" });
  }
}
