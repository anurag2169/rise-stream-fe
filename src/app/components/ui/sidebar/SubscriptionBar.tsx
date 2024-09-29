import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
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
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
      isLive: true,
    },
    {
      name: "Chai aur Code",
      imageUrl:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Raj Shamani",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Piyush Garg",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "The Sham Sharma Show",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "आचार्य प्रशान्त - Acharya Prashant",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Dostcast",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Piyush Garg",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Dostcast",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Chai aur Code",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Dostcast",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "All Subscriptions",
      imageUrl:
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D",
    },
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
              <Image
                src={channel.imageUrl}
                alt={`${channel.name} channel`}
                width={32}
                height={32}
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
