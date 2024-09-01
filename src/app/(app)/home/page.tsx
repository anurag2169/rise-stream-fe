"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import ThumbnailCard from "@/app/components/ui/thumbnailCard/ThumbnailCard";
import { videoUrlPath } from "@/app/config/url.const";
import { Video } from "@/app/types/video.type";
import { FlipWords } from "@/components/ui/flip-words";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { addUserWatchHistory } from "@/app/services/userService";

const Home = () => {
  const router = useRouter();
  const userState = useSelector(selectUserState);
  const accessToken = Cookies.get("accessToken");
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    if (userState.status === "logoutSuccess") {
      router.push("/sign-in");
    }
  }, [userState, router]);

  const getVideos = async () => {
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
      const videoData = data.data;
      setVideos(videoData.reverse());
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (accessToken === undefined || accessToken === null) {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }
    getVideos();
  }, []);

  const addVideoToHistory = async (videoId: string) => {
    setTimeout(() => {
      addUserWatchHistory(videoId);
    }, 2000);
  };

  const words = ["movies", "series", "channels", "events", "creators"];

  return (
    <div>
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div className="text-5xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
            Stream your favorite
            <FlipWords words={words} className="font-bold" />
            anytime, anywhere.
          </div>
        </motion.h1>
      </LampContainer>
      <div className="mt-20">
        <div className="flex flex-row flex-wrap gap-x-4 gap-y-10  justify-center items-center">
          {videos.map((video: Video) => {
            return (
              <div
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
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
