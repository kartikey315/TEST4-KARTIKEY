import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { id } = body;
  try {
    if (!id) {
      return NextResponse.json({ message: "Id not Found", success: false });
    }
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ user, success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error, success: false });
  }
}
