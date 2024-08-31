import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SidebarSkeleton = () => {
  return (
    <nav className="z-10 h-screen fixed left-0 flex flex-col px-1 gap-3 py-5 max-w-28 bg-background dark:bg-background-dark invisible lg:visible mt-12">
      <div className={`flex flex-col items-center gap-4 rounded-lg p-2 `}>
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-8 w-8" />
      </div>
    </nav>
  );
};

export default SidebarSkeleton;
