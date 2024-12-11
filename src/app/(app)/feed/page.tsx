"use client";
import { useRouter } from "next/navigation";
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import ThumbnailCard from "@/app/components/ui/thumbnailCard/ThumbnailCard";
import { videoUrlPath } from "@/app/config/url.const";
import { Video } from "@/app/types/video.type";
import { addUserWatchHistory } from "@/app/services/userService";
import { getAllVideos } from "@/app/services/videoService";
import { debounce } from "@/app/utils/debouncing";
import HomeSkeleton from "@/app/components/ui/HomeSkeleton";

const Feed = () => {
  const router = useRouter();
  const userState = useSelector(selectUserState);
  const [videos, setVideos] = useState<Video[]>([]);
  const accessToken = Cookies.get("accessToken");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userState.status === "logoutSuccess") {
      router.push("/sign-in");
    }
  }, [userState, router]);

  const getVideos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllVideos();
      setVideos(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (videos.length === 0) getVideos();
  }, [getVideos]);

  const reversedVideos = useMemo(() => {
    return videos.slice().reverse();
  }, [videos]);

  const addVideoToHistory = useCallback(
    debounce((videoId: string) => {
      addUserWatchHistory(videoId);
    }, 2000),
    []
  );

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <div className="mt-28 md:mt-24 w-full mx-auto flex flex-wrap justify-center gap-x-3 gap-y-8 px-4">
        {reversedVideos.map((video: Video) => {
          return (
            <span
              className="md:min-w-0 min-w-full"
              key={video._id}
              onClick={() => addVideoToHistory(video?._id)}
            >
              <Link href={`/watch/${video._id}`}>
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
