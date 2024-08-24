"use client";
import ChannelDetails from "@/app/components/ui/channelDetails/ChannelDetails";
import HomeTab from "@/app/components/ui/tabs/homeTab/HomeTab";
import Tab from "@/app/components/ui/tabs/Tabs";
import VideoTab from "@/app/components/ui/tabs/videoTab/VideoTab";
import { getUserDataFromLocalStorage } from "@/app/lib/localstorageUtils";
import {
  getUserChannelProfile,
  getUserChannelVideos,
} from "@/app/services/userService";
import { TabType } from "@/app/types/tab.type";
import { channelDetails } from "@/app/types/userChannel.types";
import React, { useEffect, useState } from "react";

const channel = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const [userChannelDetails, setuserChannelDetails] =
    useState<channelDetails | null>(null);

  const [channelVideos, setchannelVideos] = useState([]);

  const getUserChannel = async () => {
    try {
      const result = await getUserChannelProfile(username);
      setuserChannelDetails(result);
    } catch (error) {
      console.error("Failed to fetch User channel");
    }
  };

  const getchannelvideos = async () => {
    try {
      const data = await getUserChannelVideos(userChannelDetails?.data._id);
      setchannelVideos(data?.data.reverse());
    } catch (error) {
      console.error("Failed to fetch User channel videos");
    }
  };

  useEffect(() => {
    getUserChannel();
  }, []);

  useEffect(() => {
    if (userChannelDetails?.data._id) {
      getchannelvideos();
    }
  }, [userChannelDetails?.data._id]);

  const tabs: TabType[] = [
    {
      value: "home",
      label: "Home",
      content: <HomeTab />,
    },
    {
      value: "videos",
      label: "Videos",
      content: (
        <VideoTab
          userVideos={channelVideos}
          ownerAvatar={userChannelDetails?.data.avatar}
          ownerName={userChannelDetails?.data.fullName}
        />
      ),
    },
    {
      value: "playlist",
      label: "Playlist",
      content: (
        <>
          <section>Playlist Tab Content</section>
        </>
      ),
    },
    {
      value: "live",
      label: "Live",
      content: <section>Live Content</section>,
    },
  ];

  return (
    <div className="w-10/12 mt-20 mx-36 h-screen absolute">
      {userChannelDetails ? (
        <ChannelDetails channelDetails={userChannelDetails} />
      ) : (
        <div>Loading...</div>
      )}
      <Tab tabs={tabs} />
    </div>
  );
};

export default channel;
