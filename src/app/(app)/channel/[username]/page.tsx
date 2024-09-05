"use client";
import ChannelDetails from "@/app/components/ui/channelDetails/ChannelDetails";
import PlaylistTab from "@/app/components/ui/playlist/PlaylistTab";
import HomeTab from "@/app/components/ui/tabs/homeTab/HomeTab";
import Tab from "@/app/components/ui/tabs/Tabs";
import VideoTab from "@/app/components/ui/tabs/videoTab/VideoTab";
import { getChannelPlaylists } from "@/app/services/playlistService";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "@/app/services/subscriptionServices";
import {
  getUserChannelProfile,
  getUserChannelVideos,
} from "@/app/services/userService";
import { TabType } from "@/app/types/tab.type";
import { channelDetails } from "@/app/types/userChannel.types";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileCard from "@/app/components/ui/profileCard/ProfileCard";
import { useSelector } from "react-redux";
import { selectUserState } from "@/app/lib/features/user/userSlice";

const Channel = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("query") || "home";

  const [userChannelDetails, setuserChannelDetails] =
    useState<channelDetails | null>(null);

  const [channelVideos, setchannelVideos] = useState([]);
  const [channelPlaylists, setchannelPlaylists] = useState([]);
  const [subscribedChannelDetails, setSubscribedChannelDetails] = useState([]);
  const [subscribersDetails, setSubscribersDetails] = useState([]);

  const userState = useSelector(selectUserState);

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
      getSubscriptionDetails();
      getSubscriberDetails();
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

  const getSubscriptionDetails = async () => {
    try {
      const subscribedData = await getSubscribedChannels(
        userChannelDetails?.data._id
      );
      setSubscribedChannelDetails(
        subscribedData.data.subscribedChannels.reverse()
      );
    } catch (error) {
      console.log("Failed to get subscription details" + error);
    }
  };
  const getSubscriberDetails = async () => {
    try {
      const subscriberData = await getUserChannelSubscribers(
        userChannelDetails?.data._id
      );
      setSubscribersDetails(subscriberData?.data.reverse());
    } catch (error) {
      console.log("Failed to get channel subsribers" + error);
    }
  };

  useEffect(() => {
    getUserChannel();
  }, []);

  useEffect(() => {
    if (userChannelDetails?.data._id) {
      getchannelvideos();
      getChannelplaylists();
      getSubscriptionDetails();
      getSubscriberDetails();
    }
  }, [userChannelDetails?.data._id]);

  const tabs: TabType[] = [
    {
      value: "home",
      label: "Home",
      isVisible: true,
      content: (
        <HomeTab
          channelVideos={channelVideos}
          channelId={userChannelDetails?.data._id}
        />
      ),
    },
    {
      value: "videos",
      label: "Videos",
      isVisible: true,
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
      isVisible: true,
      content: <PlaylistTab playlists={channelPlaylists} />,
    },
    {
      value: "subscribers",
      label: "Subscribers",
      isVisible: true,
      content: (
        <div className="p-4">
          <h2 className="text-xl font-semibold pb-2">Channel Subscribers</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {subscribersDetails &&
              subscribersDetails.map((subscriber: any) => (
                <div
                  key={subscriber.subscriber?._id}
                  className="flex flex-col items-center justify-center mb-2"
                >
                  <ProfileCard
                    name={subscriber.subscriber?.fullName}
                    username={subscriber.subscriber?.username}
                    description={
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quas, doloribus quidem, dolores ipsum tempora accusantium, natus minus molestias necessitatibus quia porro. Neque esse iste suscipit temporibus quis odio cum, delectus atque consequuntur debitis alias aperiam aliquam, aliquid eos recusandae."
                    }
                    avatarUrl={subscriber.subscriber?.avatar}
                    createdAt={subscriber?.createdAt}
                  />
                </div>
              ))}
          </div>
        </div>
      ),
    },
    {
      value: "subscription",
      label: `Subscription (${subscribedChannelDetails.length})`,
      isVisible: false,
      content: (
        <div className="p-4">
          <h2 className="text-xl font-semibold pb-2">Subscribed Channels</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {subscribedChannelDetails &&
              subscribedChannelDetails.map((subsChannel: any) => (
                <div
                  key={subsChannel.channel?._id}
                  className="flex flex-col items-center justify-center mb-3"
                >
                  <ProfileCard
                    name={subsChannel.channel?.fullName}
                    username={subsChannel.channel?.username}
                    description={
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quas, doloribus quidem, dolores ipsum tempora accusantium, natus minus molestias necessitatibus quia porro. Neque esse iste suscipit temporibus quis odio cum, delectus atque consequuntur debitis alias aperiam aliquam, aliquid eos recusandae."
                    }
                    avatarUrl={subsChannel.channel?.avatar}
                    createdAt={subsChannel?.createdAt}
                  />
                </div>
              ))}
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full lg:w-10/12 mt-5 lg:mx-36 h-screen">
      {userChannelDetails ? (
        <ChannelDetails
          channelDetails={userChannelDetails}
          toggleSubscriber={togglesubscription}
        />
      ) : (
        <div>Loading...</div>
      )}
      <div className="">
        <Tab tabs={tabs} activetab={tabQuery} />
      </div>
    </div>
  );
};

export default Channel;
