"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/button";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";


export default function Home() {
  const router = useRouter();
  return (
    <main className="h-screen flex flex-col gap-[20px] items-center justify-center layout">
      <h1>Your Sangeet Dashboard</h1>
      <h2 className="text-white-black">Manage a Raaga Library, take attendance, and keep track of individual student performance.</h2>
      <Button icon={<ArrowRight weight="regular" size={20} />} onClick={() => router.push("/login")}>Get Started</Button>
    </main>
  );
}
