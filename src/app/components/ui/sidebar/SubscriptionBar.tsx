import {
  SubscribedChannelDetail,
  SubscribedChannelProps,
} from "@/app/types/sidebar.type";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const SubscriptionBar: React.FC<SubscribedChannelProps> = ({
  subscribedChannelDetails = [],
  onCloseSideBar,
  showMore = false,
  showMoreHandler = () => {},
}) => {
  return (
    <div className="w-full bg-gradient-to-b from-muted/60 muted-foreground text-foreground p-4 my-4 rounded-lg shadow-md">
      <h2 className="text-base font-semibold mb-2">Subscriptions</h2>
      <ScrollArea
        className={`${
          showMore ? "h-full" : "h-[120px]"
        } overflow-hidden no-scrollbar`}
      >
        <ul className="space-y-3">
          {subscribedChannelDetails.map((channelDetail: any, index: any) => (
            <li key={index} className="flex items-center space-x-3">
              <Image
                src={
                  channelDetail?.channel?.avatar ||
                  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaHxlbnwwfHwwfHx8MA%3D%3D"
                }
                alt={`${channelDetail.channel.fullName} channel`}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <Link href={`/channel/${channelDetail.channel.username}`}>
                <span
                  onClick={onCloseSideBar}
                  className="text-sm flex-grow truncate"
                >
                  {channelDetail.channel.fullName}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ScrollArea>
      {subscribedChannelDetails.length > 3 && (
        <Button
          variant="ghost"
          className="w-full justify-start mt-3 px-0 cursor-pointer"
          onClick={showMoreHandler}
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
      )}
    </div>
  );
};

export default SubscriptionBar;
