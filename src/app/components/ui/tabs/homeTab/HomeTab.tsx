"use client";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import { addUserWatchHistory } from "@/app/services/userService";
import { Video } from "@/app/types/video.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import ThumbnailCard from "../../thumbnailCard/ThumbnailCard";

const HomeTab = ({ channelVideos, channelId }: any) => {
  const latestVideos = channelVideos
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  const userState = useSelector(selectUserState);

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

      <>
        <div className="flex flex-row flex-wrap justify-center md:justify-start">
          {latestVideos.map((video: Video) => (
            <div
              key={video?._id}
              className="flex flex-col my-3"
              onClick={() => addVideoToHistory(video._id)}
            >
              <Link href={`/watch/${video._id}`}>
                <ThumbnailCard
                  title={video?.title}
                  thumbnail={video?.thumbnail}
                  duration={video?.duration}
                  createdAt={video?.createdAt}
                  views={0}
                  ownerAvatar={video?.owner.avatar}
                  ownerName={video?.owner.fullName}
                  videoUrl={video?.videoFile}
                />
              </Link>
            </div>
          ))}
        </div>
        {latestVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center my-3">
            <h2 className="mb-4 text-xl font-bold">
              Please Upload Some Videos!
            </h2>
            {userState?.data?.data?.user?._id === channelId && (
              <Link href={"/uploadVideo"}>
                <Button variant={"default"}>Click Here</Button>
              </Link>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default HomeTab;
