import Link from "next/link";
import React from "react";
import ThumbnailCard from "../../thumbnailCard/ThumbnailCard";
import { addVideoToHistory } from "@/app/(app)/home/page";

const VideoTab = ({ userVideos = [], ownerName, ownerAvatar }: any) => {
  return (
    <>
      <section className="p-4">
        <h2 className="mb-4 text-xl font-bold">Latest Videos</h2>
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-10  justify-center items-center">
          {userVideos.map((video: any) => (
            <div
              key={video._id}
              className="relative flex flex-col gap-2"
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
