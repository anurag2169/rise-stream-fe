"use client";

import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="#" className="text-xl font-bold mb-4 md:mb-0">
          Rise Stream
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
