"use client";
import AccountDetails from "@/app/components/ui/accountDetails/AccountDetails";
import ThumbnailCard from "@/app/components/ui/thumbnailCard/ThumbnailCard";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import React, { useDeferredValue, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AdminPanel = () => {
  const userState = useSelector(selectUserState);
  const searchParams = useSearchParams();
  const menuQuery = searchParams.get("query") || "account";
  const [selectedOption, setSelectedOption] = useState(menuQuery);

  // useEffect(() => {
  //   setSelectedOption(menuQuery);
  // }, [menuQuery]);

  const menuOptions = [
    { id: "account", label: "Account" },
    { id: "videos", label: "Videos" },
    { id: "playlists", label: "Playlist" },
    { id: "downloads", label: "Downloads" },
    { id: "subscriptions", label: "Subscriptions" },
    { id: "connected", label: "Connected apps" },
    { id: "billing", label: "Billing and payments" },
    { id: "advanced", label: "Advanced settings" },
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case "account":
        return (
          <AccountDetails
            email={userState.data?.data.user?.email}
            name={userState.data?.data.user.fullName}
            userName={userState.data?.data.user.username}
            avatarUrl={userState.data?.data.user.avatar}
          />
        );
      case "videos":
        return (
          <span>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
              <ThumbnailCard
                title={"lorem lorem"}
                thumbnail={
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                duration={"25"}
              />
            </div>
          </span>
        );
      case "playlists":
        return (
          <h2 className="text-2xl font-bold">
            Playback and Performance Content
          </h2>
        );
      case "downloads":
        return <h2 className="text-2xl font-bold">Downloads Content</h2>;
      case "privacy":
        return <h2 className="text-2xl font-bold">Privacy Content</h2>;
      case "connected":
        return <h2 className="text-2xl font-bold">Connected Apps Content</h2>;
      case "billing":
        return (
          <h2 className="text-2xl font-bold">Billing and Payments Content</h2>
        );
      case "advanced":
        return (
          <>
            <h2 className="text-2xl font-bold">Advanced Settings Content</h2>
            <span className="text-muted-foreground">Coming Soon</span>
          </>
        );
      default:
        return <h2 className="text-2xl font-bold">Select an option</h2>;
    }
  };

  const SidebarContent = () => (
    <>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <ScrollArea className="h-[calc(100vh-64px)]">
        <nav className="space-y-1 p-2">
          {menuOptions.map((option) => (
            <Button
              key={option.id}
              variant={selectedOption === option.id ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setSelectedOption(option.id)}
            >
              {option.label}
            </Button>
          ))}
        </nav>
      </ScrollArea>
    </>
  );

  return (
    <div className="flex h-screen bg-background text-foreground ">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 border-r border-border h-screen">
        <SidebarContent />
      </aside>

      {/* Main content area */}
      <main className="flex-1 py-6 px-3 overflow-auto no-scrollbar ">
        <div className="md:hidden flex justify-between items-center mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel;
