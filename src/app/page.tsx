import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-4 items-center justify-center bg-black">
      <h1 className="text-white">ONESTEP</h1>
      <div className="w-[24%] bg-yellow-600 text-black text-center py-2 rounded font-semibold mb-4">
        <Link href="/signup">SIGN UP</Link>
      </div>
      <div className="w-[24%] bg-yellow-600 text-black text-center py-2 rounded font-semibold mb-4">
        <Link href="/login">LOGIN</Link>
      </div>
      <div className="flex gap-4"></div>
    </div>
  );
}
