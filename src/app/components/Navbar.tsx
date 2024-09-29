"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../lib/store";
import { logoutUser, selectUserState } from "../lib/features/user/userSlice";
import Cookies from "js-cookie";
import { AvatarIcon, ExitIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import SideBar from "./ui/sidebar/SideBar";
import { getSideBarData } from "../config/sideBarData";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProps, SubscribedChannelDetail } from "../types/sidebar.type";
import { getSubscribedChannels } from "../services/subscriptionServices";

function Navbar() {
  const router = useRouter();
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch<AppDispatch>();
  const accessToken = Cookies.get("accessToken") || "";
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [searchInputData, setSearchInputData] = useState("");

  const [sidebarData, setSidebarData] = useState<SidebarProps | null>(null);

  const [subscribedChannelDetails, setSubscribedChannelDetails] = useState<
    SubscribedChannelDetail[]
  >([]);

  const [showMore, setShowMore] = useState(false);

  const handleSearch = (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      router.push(`/search?query=${encodeURIComponent(searchInputData)}`);
    }
  };

  useEffect(() => {
    if (userState.status === "logoutSuccess") {
      router.push("/sign-in");
    }
  }, [userState, router]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setShowMore(false);
  };

  const logout = async (e: any) => {
    e.preventDefault();
    dispatch(logoutUser(accessToken));
  };

  useEffect(() => {
    const data = getSideBarData();
    setSidebarData(data);
    getSubscriptionDetails();
  }, [pathname]);

  const getSubscriptionDetails = async () => {
    try {
      const subscribedData = await getSubscribedChannels(
        userState.data?.data?.user?._id
      );
      setSubscribedChannelDetails(
        subscribedData?.data?.subscribedChannels.reverse()
      );
    } catch (error) {
      console.log("Failed to get subscription details" + error);
    }
  };

  const showMoreHandler = () => {
    setShowMore(!showMore);
  };

  return (
    <>
      <header className="fixed top-0 z-40 w-full bg-background shadow-sm px-2 md:px-9">
        <main className="w-full flex items-center justify-between items-center h-14">
          <div className="flex gap-5">
            <Button
              variant={"ghost"}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300"
              onClick={toggleSidebar}
            >
              <HamburgerMenuIcon className="h-6 w-6" />
            </Button>

            <Link
              href="/"
              className="flex items-center gap-2 hidden md:block"
              prefetch={false}
            >
              <h3 className="text-md md:text-2xl font-extrabold tracking-tight text-gray-800 dark:text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 ">
                  Rise Stream
                </span>
              </h3>
            </Link>
          </div>
          <div className="relative w-1/2 lg:w-1/4 ">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <SearchIcon className="h-4 w-4" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              value={searchInputData}
              name={searchInputData}
              id={searchInputData}
              onChange={(e: any) => setSearchInputData(e.target.value)}
              onKeyDown={handleSearch}
              className="h-9 rounded-lg bg-muted pl-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-1 md:gap-4">
            <div className="">
              <ThemeSwitcher />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="rounded-full">
                    <AvatarImage
                      src={userState.data?.data?.user?.avatar}
                      alt="Channel avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 rounded-xl" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">
                      {userState.data?.data?.user?.email}
                    </p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <div className="mb-2">
                    <Avatar className="h-24 w-24 mx-auto">
                      <AvatarImage
                        src={userState.data?.data?.user?.avatar}
                        alt={userState.data?.data?.user?.username}
                      />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                  </div>
                  <p className="text-center text-xl font-semibold">
                    Hi, {userState.data?.data?.user?.fullName}!
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer flex flex-row items-center gap-2">
                  <AvatarIcon className="w-4 h-4" />
                  <Link href={"/admin?query=account"}>
                    <span>Manage your Google Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer flex flex-row items-center gap-2"
                  onClick={logout}
                >
                  <ExitIcon className="w-4 h-4 " />
                  <span>Sign out</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <div className="flex justify-center gap-3 p-2 text-xs text-muted-foreground">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                  <span>•</span>
                  <a href="#" className="hover:underline">
                    Terms of Service
                  </a>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </main>

        {sidebarData && (
          <SideBar
            data={sidebarData.data}
            isSubmenuOpen={true}
            isSidebarOpen={isSidebarOpen}
            closeSideBar={toggleSidebar}
            subscribedChannelDetails={subscribedChannelDetails}
            showMore={showMore}
            showMoreHandler={showMoreHandler}
          />
        )}
      </header>
    </>
  );
}

export default Navbar;

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
