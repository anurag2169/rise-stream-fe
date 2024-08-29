import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { channelDetailsProps } from "@/app/types/userChannel.types";

const ChannelDetails: React.FC<channelDetailsProps> = ({
  channelDetails,
  toggleSubscriber,
}) => {
  return (
    <>
      <div>
        <div className="relative h-[300px] overflow-hidden w-full rounded-xl">
          <img
            src={channelDetails?.data.coverImage}
            alt="Cover Image"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container mx-auto py-8 px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={channelDetails?.data.avatar} />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold capitalize">
                {channelDetails?.data.fullName}
              </h2>
              <p className="text-sm text-muted-foreground pt-2">
                {channelDetails?.data.username}
              </p>
              <p className="text-sm text-muted-foreground flex gap-2 capitalize">
                <span>{channelDetails?.data.subscribersCount} subscribers</span>
                <span>1.3K Videos</span>
              </p>
            </div>

            <Button
              variant={
                !channelDetails?.data.isSubscribed ? "outline" : "default"
              }
              className="ml-auto capitalize"
              onClick={() => toggleSubscriber()}
            >
              {!channelDetails?.data.isSubscribed ? "Subscribe" : "Subscribed"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelDetails;
