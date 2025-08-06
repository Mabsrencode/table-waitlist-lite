"use client";
import MainLoader from "@/components/reusable/MainLoader/MainLoader";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") {
      router.replace("/waitlist");
      return;
    }
  }, [router, pathname]);

  return <MainLoader />;
};

export default Home;
