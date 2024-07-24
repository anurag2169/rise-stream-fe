"use client";
import React from "react";

const channel = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  return (
    <div className=" mt-20 ml-64 h-screen absolute">channel {username}</div>
  );
};

export default channel;
