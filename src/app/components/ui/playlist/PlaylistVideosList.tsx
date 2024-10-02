import { playListVideoProps } from "@/app/types/playlist.types";
import { formatCreatedAt, truncateText } from "@/app/utils/dateFormater";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PlaylistVideosList: React.FC<playListVideoProps> = ({ videoDetails }) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-start p-4 border-b w-full md:gap-4">
        <div className="w-full h-36  md:w-1/3">
          <Link href={`/watch/${videoDetails?._id}`}>
            <img
              src={videoDetails?.thumbnail || "/placeholder.svg"}
              alt="System Design for Beginners Course"
              className="rounded-lg w-full h-full object-cover"
            />
          </Link>
        </div>
        <div className="m-2">
          <h3 className="text-md md:text-lg font-bold capitalize ">
            <Link href={`/watch/${videoDetails?._id}`}>
              {truncateText(videoDetails?.title || "title", 30)}
            </Link>
          </h3>
          <div className="flex md:gap-2 flex-col md:flex-row">
            <span className="font-xs md:text-sm text-gray-400">
              <Link href={`/channel/${videoDetails?.owner?.username}`}>
                {videoDetails?.owner?.username || "RS"}
              </Link>
            </span>

            <div className="font-xs md:text-sm wrap-nowrap text-gray-400">
              {formatCreatedAt(videoDetails?.updatedAt)}
            </div>
          </div>
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
