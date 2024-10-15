import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { authenticator } from "otplib";
import { prisma } from "@/lib/prisma";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const SECRET_KEY = process.env.OTP_GENERATION_SECRET_KEY;

export async function POST(req: NextRequest) {
  try {
    const { telegramId } = await req.json();

    if (!telegramId) {
      return NextResponse.json({ message: "Telegram ID is required." });
    }
    const otp = authenticator.generate(SECRET_KEY!);

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const user = await prisma.oTP.findUnique({ where: { id: telegramId } });

    if (!user) {
      await prisma.oTP.create({
        data: {
          id: telegramId,
          otp: otp,
          expiresAt,
        },
      });
    } else {
      await prisma.oTP.update({
        where: {
          id: telegramId,
        },
        data: {
          otp: otp,
          expiresAt,
        },
      });
    }

    const message = `Your OTP for verification is: ${otp}`;
    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    await axios.post(telegramUrl, {
      chat_id: telegramId,
      text: message,
    });

    return NextResponse.json({
      message: "OTP sent successfully",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({
      message: "Failed to send OTP",
      status: "FAILED",
    });
  }
}
