"use client";
import Link from "next/link";
import React from "react";
import ThumbnailCard from "../../thumbnailCard/ThumbnailCard";
import { addUserWatchHistory } from "@/app/services/userService";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

const VideoTab = ({ userVideos = [], ownerName, ownerAvatar }: any) => {
  const addVideoToHistory = async (videoId: string) => {
    setTimeout(() => {
      addUserWatchHistory(videoId);
    }, 2000);
  };
  return (
    <>
      <section className="py-2 md:py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Latest Videos</h2>
          <Link href={"/uploadVideo"}>
            <Button variant="ghost" className="flex items-center gap-2">
              <PlusIcon className="h-5 w-5" />
              Upload Video
            </Button>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap justify-center md:justify-start gap-3 md:min-w-0 min-w-full">
          {userVideos.map((video: any) => (
            <div
              key={video._id}
              className="flex flex-col mb-2 md:mb-5"
              onClick={() => addVideoToHistory(video._id)}
            >
              <Link href={`/watch/${video._id}`}>
                <ThumbnailCard
                  title={video?.title}
                  thumbnail={video?.thumbnail}
                  duration={video?.duration}
                  createdAt={video?.createdAt}
                  views={0}
                  ownerAvatar={ownerAvatar}
                  ownerName={ownerName}
                  videoUrl={video?.videoFile}
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default VideoTab;
