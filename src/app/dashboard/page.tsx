"use client";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const session = useSession();

  console.log(session);

  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-black">
      <h1 className="text-white">Welcome {session.data?.user.email}</h1>
      <h1 className="text-white">ONESTEP DASHBOARD</h1>
      <div className="flex gap-4"></div>
    </div>
  );
}
