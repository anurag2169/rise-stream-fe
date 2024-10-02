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
import { cn } from "@/lib/utils";
import { debounce } from "@/app/utils/debouncing";
import HomeSkeleton from "@/app/components/ui/HomeSkeleton";

const Home = () => {
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
      const res = await fetch(videoUrlPath.getAllVideos, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
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

  const categories = [
    "All",
    "Music",
    "APIs",
    "Podcasts",
    "Software Engineering",
    "Live",
    "Jukebox",
    "Mixes",
    "Ghazal",
    "Rahat Fateh Ali Khan",
    "Amit Trivedi",
    "Movie musicals",
    "Kailash Kher",
    "Satsang",
  ];
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollOffset;
    }
  };

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <>
      <div className="fixed top-14 z-10 w-full bg-muted/60 dark:bg-slate-950/60 backdrop-blur">
        <div className="relative w-full md:px-16 mb-4 mt-2 ">
          <div
            ref={scrollContainerRef}
            className="flex justify-start overflow-x-auto whitespace-nowrap space-x-4 p-4 no-scrollbar"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            onClick={() => scroll(-200)}
            className={`hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 w-10 ml-2 rounded-full shadow-md`}
          >
            ←
          </button>
          <button
            onClick={() => scroll(200)}
            className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 mr-2 w-10 rounded-full shadow-md"
          >
            →
          </button>
        </div>
      </div>
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

export default Home;
