"use client";
import { SidebarProps } from "@/app/types/sidebar.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarSecondary: React.FC<SidebarProps> = ({ data }) => {
  return (
    <nav className="z-10 h-screen fixed left-0 flex flex-col px-1 gap-3 py-5 max-w-28 bg-background dark:bg-background-dark invisible md:visible">
      {data?.map((item: any, index) => (
        <Link
          key={index}
          href={item?.routerLink}
          className={` rounded-sm ${
            usePathname() === item.routerLink
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground"
          }`}
          prefetch={false}
        >
          <div
            className={`flex flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-accent hover:text-accent-foreground`}
          >
            <div>{item.Icon && <item.Icon className="h-5 w-5" />}</div>
            <div className="text-xs font-medium px-1">{item.menuName}</div>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default SidebarSecondary;