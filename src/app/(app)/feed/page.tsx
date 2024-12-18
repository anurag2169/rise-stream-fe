"use client";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import ThumbnailCard from "@/app/components/ui/thumbnailCard/ThumbnailCard";
import { Video } from "@/app/types/video.type";
import { addUserWatchHistory } from "@/app/services/userService";
import { debounce } from "@/app/utils/debouncing";
import HomeSkeleton from "@/app/components/ui/HomeSkeleton";
import { useGetVideosQuery } from "@/app/lib/features/api/videoApiSlice";

const Feed = () => {
  const router = useRouter();
  const userState = useSelector(selectUserState);

  // rtk query code
  const { data: Videos, isLoading } = useGetVideosQuery({});

  useEffect(() => {
    if (userState.status === "logoutSuccess") {
      router.push("/sign-in");
    }
  }, [userState, router]);

  const addVideoToHistory = useCallback(
    debounce((videoId: string) => {
      addUserWatchHistory(videoId);
    }, 2000),
    []
  );

  if (isLoading) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <div className="mt-28 md:mt-24 w-full mx-auto flex flex-wrap justify-center gap-x-3 gap-y-8 px-4">
        {Videos.data.map((video: Video) => {
          return (
            <span
              className="md:min-w-0 min-w-full"
              key={video._id}
              onClick={() => addVideoToHistory(video?._id)}
            >
              <Link  href={`/watch/${video._id}`}>
                <ThumbnailCard
                  title={video.title}
                  views={video.views}
                  duration={video.duration}
                  thumbnail={video.thumbnail}
                  createdAt={video.createdAt}
                  ownerAvatar={video.owner.avatar}
                  ownerName={video.owner.fullName}
                  videoUrl={video.videoFile}
                />
              </Link>
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Feed;
