"use client";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import { addUserWatchHistory } from "@/app/services/userService";
import { Video } from "@/app/types/video.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ThumbnailCard from "../../thumbnailCard/ThumbnailCard";
import { Skeleton } from "@/components/ui/skeleton";

const HomeTab = ({ channelVideos, channelId }: any) => {
  const [loading, setLoading] = useState(true);
  const [latestVideos, setLatestVideos] = useState<Video[]>([]);
  const userState = useSelector(selectUserState);

  // const latestVideos = channelVideos
  //   .sort(
  //     (a: any, b: any) =>
  //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //   )
  //   .slice(0, 3);

  useEffect(() => {
    if (channelVideos && channelVideos.length > 0) {
      // Simulate a loading delay or fetch
      setTimeout(() => {
        const sortedVideos = channelVideos
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);
        setLatestVideos(sortedVideos);
        setLoading(false); // Data has been loaded
      }, 2000); // Simulate loading time
    } else {
      setLoading(false); // No videos to load
    }
  }, [channelVideos]);

  const addVideoToHistory = async (videoId: string) => {
    setTimeout(() => {
      addUserWatchHistory(videoId);
    }, 2000);
  };
  return (
    <div className="py-2 md:py-4 ">
      {latestVideos.length != 0 && (
        <h2 className="mb-4 text-xl font-bold">Recently Uploaded</h2>
      )}

      <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3">
        {loading ? (
          [...Array(3)].map((_, idx) => (
            <Skeleton key={idx} className="h-56 w-96 p-3">
              <Skeleton className="h-28 w-full mb-2"></Skeleton>
              <Skeleton className="h-5 w-full" />
            </Skeleton>
          ))
        ) : latestVideos.length > 0 ? (
          latestVideos.map((video: Video) => (
            <span
              key={video._id}
              className="flex flex-col my-3"
              onClick={() => addVideoToHistory(video._id)}
            >
              <Link href={`/watch/${video._id}`}>
                <ThumbnailCard
                  title={video.title}
                  thumbnail={video.thumbnail}
                  duration={video.duration}
                  createdAt={video.createdAt}
                  views={0}
                  ownerAvatar={video.owner.avatar}
                  ownerName={video.owner.fullName}
                  videoUrl={video.videoFile}
                />
              </Link>
            </span>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center my-3">
            <h2 className="mb-4 text-xl font-bold">
              Please Upload Some Videos!
            </h2>
            {userState?.data?.data?.user?._id === channelId && (
              <Link href="/uploadVideo">
                <Button variant="default">Click Here</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeTab;
