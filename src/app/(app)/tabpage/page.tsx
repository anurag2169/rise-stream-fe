"use client";

import AnimatedTab from "@/app/components/AnimatedTab";
import React from "react";
import { simpleTestTabData } from "@/app/config/tab-data";
const Component = () => {
  return (
    <div className="m-32">
      <AnimatedTab direction="horizontal" tabs={simpleTestTabData} />
    </div>
  );
};

export default Component;
