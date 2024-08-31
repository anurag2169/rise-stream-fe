"use client";
import HomeSkeleton from "@/app/components/ui/HomeSkeleton";
import ProfileCard from "@/app/components/ui/profileCard/ProfileCard";
import VideoAndPlaylistCard from "@/app/components/ui/videoPlaylistCard/VideoAndPlaylistCard";
import { getsearchDetails } from "@/app/services/searchService";
import { addUserWatchHistory } from "@/app/services/userService";
import { Owner, Video } from "@/app/types/video.type";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";
  const [searchedData, setSearchedData] = useState({
    users: [],
    videos: [],
    playlists: [],
  });

  const [loading, setLoading] = useState(true);

  const searchresults = async (query: any) => {
    if (!query.trim()) {
      setSearchedData({ users: [], videos: [], playlists: [] });
      setLoading(false);
      return;
    }
    try {
      const data = await getsearchDetails(query);
      setSearchedData(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search details:", error);
      setLoading(false);
    }
  };

  const addVideoToHistory = async (videoId: string) => {
    setTimeout(() => {
      addUserWatchHistory(videoId);
    }, 2000);
  };

  useEffect(() => {
    searchresults(searchQuery);
  }, [searchQuery]);

  if (loading) {
    return (
      <>
        <HomeSkeleton />
      </>
    );
  }
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
            onClick={() => addVideoToHistory(video._id)}
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

export default Search;
