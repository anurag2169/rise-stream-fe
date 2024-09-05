"use client";
import AccountDetails from "@/app/components/ui/accountDetails/AccountDetails";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const AdminPanel = () => {
  const searchParams = useSearchParams();
  const menuQuery = searchParams.get("query") || "account";
  const [selectedOption, setSelectedOption] = useState(menuQuery);

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
        return <AccountDetails />;
      case "notifications":
        return <h2 className="text-2xl font-bold">Notifications Content</h2>;
      case "playback":
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
          <h2 className="text-2xl font-bold">Advanced Settings Content</h2>
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
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-64 border-r border-border">
        <SidebarContent />
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 overflow-auto">
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
