"use client";
import ChannelDetails from "@/app/components/ui/channelDetails/ChannelDetails";
import PlaylistTab from "@/app/components/ui/playlist/PlaylistTab";
import HomeTab from "@/app/components/ui/tabs/homeTab/HomeTab";
import Tab from "@/app/components/ui/tabs/Tabs";
import VideoTab from "@/app/components/ui/tabs/videoTab/VideoTab";
import { toggleSubscription } from "@/app/services/subscriptionServices";
import { TabType } from "@/app/types/tab.type";
import React from "react";
import { useSearchParams } from "next/navigation";
import ProfileCard from "@/app/components/ui/profileCard/ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetUserChannelProfileQuery,
  useGetUserChannelVideosQuery,
  useGetUserPlaylistsQuery,
} from "@/app/lib/features/api/videoApiSlice";
import { useGetUserChannelSubscribersQuery } from "@/app/lib/features/api/subscribedApiSlice";

const Channel = ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get("query") || "home";

  // rtk query code
  const {
    data: userChannelDetails,
    isLoading,
    refetch: refetchChannelDetails,
  } = useGetUserChannelProfileQuery(username);

  const userId = userChannelDetails?.data?._id;

  const { data: channelVideos, isLoading: isLoadingvideos } =
    useGetUserChannelVideosQuery(userId, { skip: !userId });

  const { data: channelPlaylists } = useGetUserPlaylistsQuery(userId, {
    skip: !userId,
  });

  const {
    data: subscribersDetails,
    isLoading: isSubscriberLoading,
    refetch: refetchSubscribers,
  } = useGetUserChannelSubscribersQuery(userId, {
    skip: !userId,
  });

  const togglesubscription = async () => {
    try {
      await toggleSubscription(userId);
      refetchSubscribers();
      refetchChannelDetails();
    } catch (error) {
      console.error("Failed to toggle User channel subscription");
    }
  };

  const tabs: TabType[] = [
    {
      value: "home",
      label: "Home",
      isVisible: true,
      content: (
        <HomeTab
          channelVideos={channelVideos?.data}
          channelId={userChannelDetails?.data._id}
          loading={isLoadingvideos}
        />
      ),
    },
    {
      value: "videos",
      label: "Videos",
      isVisible: true,
      content: (
        <VideoTab
          userVideos={channelVideos?.data}
          ownerAvatar={userChannelDetails?.data.avatar}
          ownerName={userChannelDetails?.data.fullName}
        />
      ),
    },
    {
      value: "playlist",
      label: "Playlist",
      isVisible: true,
      content: <PlaylistTab playlists={channelPlaylists?.data} />,
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
              subscribersDetails?.data.map((subscriber: any) => (
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
  ];

  return (
    <div className="w-full lg:w-10/12 mt-5 lg:mx-36 h-screen">
      {!isLoading ? (
        <ChannelDetails
          channelDetails={userChannelDetails}
          toggleSubscriber={togglesubscription}
        />
      ) : (
        <Skeleton className="h-52 md:h-80 overflow-hidden rounded-xl mx-2 p-5 flex flex-col gap-5 justify-between" />
      )}

      <Tab tabs={tabs} activetab={tabQuery} />
    </div>
  );
};

export default Channel;
