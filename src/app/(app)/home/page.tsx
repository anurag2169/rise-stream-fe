"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUserState } from "@/app/lib/features/user/userSlice";
import { AppDispatch } from "@/app/lib/store";

const Home = () => {
  const router = useRouter();
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch<AppDispatch>();
  const user = userState?.data?.data.user;
  const accessToken = Cookies.get("accessToken") || "";

  const logout = async (e: any) => {
    e.preventDefault();
    dispatch(logoutUser(accessToken));
  };

  useEffect(() => {
    if (userState.status === "logoutSuccess") {
      router.push("/sign-in");
    }
  }, [userState, router]);

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
        <div>{user?.email}</div>
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
