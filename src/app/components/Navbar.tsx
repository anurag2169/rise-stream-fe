"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../lib/store";
import { logoutUser, selectUserState } from "../lib/features/user/userSlice";
import Cookies from "js-cookie";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import SideBar from "./ui/sidebar/SideBar";
import { sideBarData } from "../config/sideBarData";
import SidebarSecondary from "./ui/SidebarSecondary/SidebarSecondary";

function Navbar() {
  const router = useRouter();
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch<AppDispatch>();
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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="fixed top-0 z-40 w-full bg-background shadow-sm px-9">
        <div className=" flex h-14 items-center justify-between">
          <div className="flex gap-5">
            <Button
              variant={"ghost"}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
              onClick={toggleSidebar}
            >
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>

            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <MountainIcon className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
          </div>
          <div className="relative flex-1 max-w-md">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <SearchIcon className="h-4 w-4" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className="h-9 w-full rounded-lg bg-muted pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-4">
            <div>
              <ThemeSwitcher />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <BellIcon className="h-5 w-5" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Card className="shadow-none border-0">
                  <CardHeader className="border-b">
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      You have 3 unread messages.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">
                          Your call has been confirmed.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          5 min ago
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">
                          You have a new message!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          1 min ago
                        </p>
                      </div>
                    </div>
                    <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                      <span className="flex h-2 w-2 translate-y-1.5 rounded-full bg-blue-500" />
                      <div className="grid gap-1">
                        <p className="text-sm font-medium">
                          Your subscription is expiring soon!
                        </p>
                        <p className="text-sm text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <img
                    src="https://github.com/shadcn.png"
                    width="36"
                    height="36"
                    className="rounded-full"
                    alt="Avatar"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Team
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Subscription
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      {!isSidebarOpen && (
        <div className="mt-14">
          <SidebarSecondary data={sideBarData.data} />
        </div>
      )}
      <SideBar
        data={sideBarData.data}
        isSubmenuOpen={true}
        isSidebarOpen={isSidebarOpen}
      />
    </>
  );
}

export default Navbar;

function BellIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
