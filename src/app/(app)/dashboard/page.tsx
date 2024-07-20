"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Cookies from 'js-cookie';

const dashboard = () => {
  const router = useRouter();
  const logout = async () => {
    const accessToken = Cookies.get("accessToken");

    const res = await fetch("http://localhost:8000/api/v1/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log("logout successfully:", data);
      router.push("/sign-in");
    } else {
      const errorData = await res.json();
      console.error("logout error:", errorData);
    }
  };
  return (
    <>
      <div>dashboard</div>

      <button
        onClick={logout}
        className=" m-4 w-24 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      >
        logout
      </button>
    </>
  );
};

export default dashboard;
