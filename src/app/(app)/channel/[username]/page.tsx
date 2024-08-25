"use client";
import ChannelDetails from "@/app/components/ui/channelDetails/ChannelDetails";
import PlaylistTab from "@/app/components/ui/playlist/PlaylistTab";
import HomeTab from "@/app/components/ui/tabs/homeTab/HomeTab";
import Tab from "@/app/components/ui/tabs/Tabs";
import VideoTab from "@/app/components/ui/tabs/videoTab/VideoTab";
import { getChannelPlaylists } from "@/app/services/playlistService";
import { toggleSubscription } from "@/app/services/subscriptionServices";
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
  const [channelPlaylists, setchannelPlaylists] = useState([]);

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

  const togglesubscription = async () => {
    try {
      await toggleSubscription(userChannelDetails?.data._id);
      getUserChannel();
    } catch (error) {
      console.error("Failed to toggle User channel subscription");
    }
  };

  const getChannelplaylists = async () => {
    const playListsData = await getChannelPlaylists(
      userChannelDetails?.data._id
    );
    setchannelPlaylists(playListsData?.data);
  };

  useEffect(() => {
    getUserChannel();
  }, []);

  useEffect(() => {
    if (userChannelDetails?.data._id) {
      getchannelvideos();
      getChannelplaylists();
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
      content: <PlaylistTab playlists={channelPlaylists} />,
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
        <ChannelDetails
          channelDetails={userChannelDetails}
          toggleSubscriber={togglesubscription}
        />
      ) : (
        <div>Loading...</div>
      )}
      <Tab tabs={tabs} />
    </div>
  );
};

export default channel;
