import { playListVideoProps } from "@/app/types/playlist.types";
import { formatCreatedAt } from "@/app/utils/dateFormater";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlaylistVideosList: React.FC<playListVideoProps> = ({ videoDetails }) => {
  return (
    <>
      <div draggable className="flex items-center space-x-4 p-4 border-b">
        <MenuIcon className="w-6 h-6" />
        <Link href={`/watch/${videoDetails?._id}`}>
          <Image
            src={videoDetails?.thumbnail || "/placeholder.svg"}
            alt="System Design for Beginners Course"
            className="w-40 h-auto rounded-lg"
            width="160"
            height="90"
            style={{ aspectRatio: "160/90", objectFit: "cover" }}
          />
        </Link>
        <div className="flex-1">
          <Link href={`/watch/${videoDetails?._id}`}>
            <h3 className="text-lg font-bold capitalize">
              {videoDetails?.title || "title"}
            </h3>
          </Link>
          <p className="flex gap-2">
            <Link href={`/channel/${videoDetails?.owner?.username}`}>
              <span>{videoDetails?.owner?.username || "RS"}</span>
            </Link>
            <span>•</span>
            <span>{videoDetails?.views} views </span>
            <span>•</span>
            <span>{formatCreatedAt(videoDetails?.updatedAt)}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default PlaylistVideosList;

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
