"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";
import { urlPath } from "@/app/config/url.const";

const Home = () => {
  const router = useRouter();
  const logout = async () => {
    const accessToken = Cookies.get("accessToken");

    const res = await fetch(urlPath.signOutUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      router.push("/sign-in");
    } else {
      const errorData = await res.json();
      console.error("logout error:", errorData);
    }
  };
  return (
    <>
      <div className="text-3xl text-center m-5">Rise Stream website</div>
      <div className="text-xl text-center m-5">
        <ThemeSwitcher />
        <div>Get started to appication</div>
        <Link
          href="/sign-up"
          className="font-medium  text-sm hover:text-primary-dark"
          prefetch={false}
        >
          <button>register account</button>
        </Link>
      </div>

      <button
        onClick={logout}
        className=" m-4 w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      >
        logout
      </button>
    </>
  );
};

export default Home;
