import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { useState } from "react";

interface Channel {
  name: string;
  imageUrl: string;
  isLive?: boolean;
}

const SubscriptionBar = () => {
  const channels: Channel[] = [
    {
      name: "IndiaTV",
      imageUrl: "/placeholder.svg?height=32&width=32",
      isLive: true,
    },
    { name: "Chai aur Code", imageUrl: "/placeholder.svg?height=32&width=32" },
    { name: "Raj Shamani", imageUrl: "/placeholder.svg?height=32&width=32" },
    { name: "Piyush Garg", imageUrl: "/placeholder.svg?height=32&width=32" },
    {
      name: "The Sham Sharma Show",
      imageUrl: "/placeholder.svg?height=32&width=32",
    },
    {
      name: "आचार्य प्रशान्त - Acharya Prashant",
      imageUrl: "/placeholder.svg?height=32&width=32",
    },
    { name: "Dostcast", imageUrl: "/placeholder.svg?height=32&width=32" },
    { name: "Piyush Garg", imageUrl: "/placeholder.svg?height=32&width=32" },
    { name: "Dostcast", imageUrl: "/placeholder.svg?height=32&width=32" },
    { name: "Chai aur Code", imageUrl: "/placeholder.svg?height=32&width=32" },
    { name: "Dostcast", imageUrl: "/placeholder.svg?height=32&width=32" },
    { name: "All Subscriptions", imageUrl: "/placeholder.svg?height=32&width=32" },
  ];

  const [showMore, setShowMore] = useState(false);

  const onClick = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="w-full bg-gradient-to-b from-muted/60 muted-foreground text-foreground p-4 my-4 rounded-lg shadow-md">
      <h2 className="text-base font-semibold mb-2">Subscriptions</h2>
      <ScrollArea
        className={`${
          showMore ? "" : "h-[300px]"
        } overflow-hidden no-scrollbar`}
      >
        <ul className="space-y-3">
          {channels.map((channel, index) => (
            <li key={index} className="flex items-center space-x-3">
              <img
                src={channel.imageUrl}
                alt={`${channel.name} channel`}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm flex-grow truncate">{channel.name}</span>
              {channel.isLive ? (
                <span className="w-2 h-2 bg-red-500 rounded-full" />
              ) : (
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Button
        variant="ghost"
        className="w-full justify-start mt-3 px-0 cursor-pointer"
        onClick={onClick}
      >
        {showMore ? (
          <span className="flex items-center mx-2">
            <ChevronDownIcon className="mr-2 h-4 w-4" />
            Show fewer
          </span>
        ) : (
          <span className="flex items-center mx-2">
            <ChevronDownIcon className="mr-2 h-4 w-4" />
            Show more
          </span>
        )}
      </Button>
    </div>
  );
};

export default SubscriptionBar;
