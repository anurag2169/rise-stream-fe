import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { channelDetailsProps } from "@/app/types/userChannel.types";
import Image from "next/image";

const ChannelDetails: React.FC<channelDetailsProps> = ({
  channelDetails,
  toggleSubscriber,
}) => {
  return (
    <>
      <div className="h-52 md:h-80 border overflow-hidden rounded-xl mx-2">
        <Image
          src={channelDetails?.data.coverImage || "/placeholder.svg"}
          alt="Cover Image"
          width={320}
          height={180}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto pt-4 px-2 md:px-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={channelDetails?.data.avatar} />
            <AvatarFallback>RS</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold capitalize">
              {channelDetails?.data.fullName}
            </h2>
            <p className="text-sm text-muted-foreground ">
              {channelDetails?.data.username}
            </p>
            <p className="text-sm text-muted-foreground flex flex-col md:flex-row md:gap-2 capitalize">
              <span>{channelDetails?.data.subscribersCount} subscribers</span>
              <span>1.3K Videos</span>
            </p>
          </div>

          <Button
            variant={!channelDetails?.data.isSubscribed ? "outline" : "default"}
            className="ml-auto capitalize"
            onClick={() => toggleSubscriber()}
          >
            {!channelDetails?.data.isSubscribed ? "Subscribe" : "Subscribed"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChannelDetails;
