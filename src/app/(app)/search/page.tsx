"use client";
import { getsearchDetails } from "@/app/services/searchService";
import { Owner, Video } from "@/app/types/video.type";
import {
  formatCreatedAt,
  formatDuration,
  truncateText,
} from "@/app/utils/dateFormater";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

const search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [searchedData, setSearchedData] = useState({
    users: [],
    videos: [],
    playlists: [],
  });

  const searchresults = async (query: any) => {
    if (!query.trim()) {
      setSearchedData({ users: [], videos: [], playlists: [] });
      return;
    }
    try {
      const data = await getsearchDetails(query);
      setSearchedData(data.data);
    } catch (error) {
      console.error("Error fetching search details:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      searchresults(searchQuery);
    }, 0);

    return () => clearTimeout(timer);
  }, [searchQuery]);
  return (
    <>
      <div className="lg:mx-20 flex flex-col">
        {searchedData.users.map((user: Owner) => (
          <div
            key={user?._id}
            className="flex items-center justify-center my-2"
          >
            <ProfileCard
              name={user?.fullName}
              username={user?.username}
              avatarUrl={user?.avatar}
              description={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quas, doloribus quidem, dolores ipsum tempora accusantium, natus minus molestias necessitatibus quia porro. Neque esse iste suscipit temporibus quis odio cum, delectus atque consequuntur debitis alias aperiam aliquam, aliquid eos recusandae."
              }
            />
          </div>
        ))}

        {searchedData.videos.map((video: Video) => (
          <div
            key={video?._id}
            className="flex items-center justify-center my-2"
          >
            <VideoAndPlaylistCard
              id={video?._id}
              title={video?.title}
              description={video?.description}
              fullname={"Lorem molestias"}
              avatarUrl={""}
              thumbnail={video?.thumbnail}
              views={video?.views}
              createdAt={video?.createdAt}
              duration={video?.duration}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default search;

interface profileCardType {
  name: string;
  username: string;
  description: string;
  avatarUrl: string;
  createdAt?: string;
}

export const ProfileCard = ({
  name,
  username,
  description,
  avatarUrl,
  createdAt,
}: profileCardType) => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center p-4 space-x-4 w-3/4 border-b">
        <Link href={`/channel/${username}`}>
          <div className="w-80 flex items-center justify-center">
            <Avatar className="rounded-full w-36 h-36 ">
              <AvatarImage
                src={avatarUrl}
                alt="Channel avatar"
                className="rounded-full"
              />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
          </div>
        </Link>
        <div>
          <Link href={`/channel/${username}`}>
            <CardContent>
              <div className="font-semibold text-xl ">{name}</div>
              <p className="text-gray-500 pb-1 pt-2">
                @{username}{" "}
                {createdAt && (
                  <>
                    <span>• </span>
                    {formatCreatedAt(createdAt)}
                  </>
                )}
              </p>
              <div className="text-gray-700">
                {truncateText(description, 90)}
              </div>
            </CardContent>
          </Link>
        </div>
      </div>
    </>
  );
};

interface videoAndPlaylistProps {
  id: string;
  title: string;
  description: string;
  fullname: string;
  thumbnail: string;
  avatarUrl: string;
  views: number;
  createdAt: string;
  duration: any;
}
export const VideoAndPlaylistCard = ({
  id,
  title,
  description,
  fullname,
  thumbnail,
  avatarUrl,
  views,
  createdAt,
  duration,
}: videoAndPlaylistProps) => {
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center p-4 space-x-4 w-3/4 ">
        <Link href={`/watch/${id}`}>
          <div className="relative h-48 w-80">
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="w-full h-48 object-cover rounded-xl"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {formatDuration(duration)}
            </div>
          </div>
        </Link>
        <div>
          <Link href={`/watch/${id}`}>
            <CardContent>
              <div className="font-semibold text-xl ">{title}</div>
              <p className="text-gray-500 text-sm">
                {views} views | {formatCreatedAt(createdAt)}
              </p>
              <div className="py-2 flex items-center gap-2">
                <Avatar className="rounded-full w-6 h-6 ">
                  <AvatarImage
                    src={avatarUrl}
                    alt="Channel avatar"
                    className="rounded-full"
                  />
                  <AvatarFallback className="text-xs">RS</AvatarFallback>
                </Avatar>
                <p className="text-gray-500 text-xs capitize">{fullname}</p>
              </div>

              <div className="text-gray-700">
                {truncateText(description, 90)}
              </div>
            </CardContent>
          </Link>
        </div>
      </Card>
    </>
  );
};
