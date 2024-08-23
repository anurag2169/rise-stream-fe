"use client";
import { UserChannel } from "@/components/component/user-channel";
import React from "react";

const channel = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  return (
    <div className="w-10/12 mt-20 mx-36 h-screen absolute">
      <UserChannel />
    </div>
  );
};

export default channel;
