"use client";
import Link from "next/link";
import React from "react";
import ThumbnailCard from "../../thumbnailCard/ThumbnailCard";
import { addUserWatchHistory } from "@/app/services/userService";

const VideoTab = ({ userVideos = [], ownerName, ownerAvatar }: any) => {
  const addVideoToHistory = async (videoId: string) => {
    setTimeout(() => {
      addUserWatchHistory(videoId);
    }, 2000);
  };
  return (
    <>
      <section className="py-2 md:py-4">
        <h2 className="mb-4 text-xl font-bold">Latest Videos</h2>
        <div className="flex flex-row flex-wrap justify-center md:justify-start">
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
