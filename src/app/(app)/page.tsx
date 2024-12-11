"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import HomeSkeleton from "../components/ui/HomeSkeleton";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/feed");
  }, [router]);

  return (
    <>
      <HomeSkeleton />
    </>
  );
}
