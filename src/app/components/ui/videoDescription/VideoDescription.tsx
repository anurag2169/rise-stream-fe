"use client";
import { truncateText } from "@/app/utils/dateFormater";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";
import React, { useState } from "react";

const VideoDescription = ({
  description,
  channelName,
  subscriber,
  channelAvatar,
  channelUserName,
}: any) => {
  const [toggle, setToggle] = useState(false);

  const toggleMore = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="mt-8 bg-muted p-4 rounded-md dark:bg-muted-dark dark:text-muted-foreground-dark">
        <h2 className="text-lg font-semibold">Description</h2>
        {!toggle && (
          <div className="">
            <p className="mt-2 text-sm text-muted-foreground">
              {truncateText(description, 140)}
              <Button onClick={toggleMore} variant={"link"}>
                more
              </Button>
            </p>
          </div>
        )}
        {toggle && (
          <>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            <div className="pt-6 ">
              <div className="flex items-center my-5">
                <Avatar>
                  <AvatarImage
                    className="w-10 h-10 rounded-full"
                    src={channelAvatar}
                  />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <Link href={`/channel/${channelUserName}`}>
                    <p className="text-sm font-semibold">{channelName}</p>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {subscriber} subscribers
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link href={`/channel/${channelUserName}?query=videos`}>
                  <Button variant={"outline"} className="px-4 py-2">
                    🎥 Videos
                  </Button>
                </Link>
                <Link href={`/channel/${channelUserName}`}>
                  <Button variant={"outline"} className="px-4 py-2">
                    📖 About
                  </Button>
                </Link>
              </div>
            </div>
            <Button className="mt-2" onClick={toggleMore} variant={"link"}>
              Show less
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default VideoDescription;
