"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import ThemeSwitcher from "@/app/components/ui/ThemeSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectUserState } from "@/app/lib/features/user/userSlice";
import { AppDispatch } from "@/app/lib/store";
import ThumbnailCard from "@/app/components/ui/thumbnailCard/ThumbnailCard";
import { videoUrlPath } from "@/app/config/url.const";
import SideBar from "@/app/components/ui/sidebar/SideBar";

interface Video {
  _id: string;
  title: string;
  thumbnail: string;
}

const Home = () => {
  const router = useRouter();
  const userState = useSelector(selectUserState);
  const dispatch = useDispatch<AppDispatch>();
  const user = userState?.data?.data.user;
  const accessToken = Cookies.get("accessToken") || "";
  const [videos, setVideos] = useState<Video[]>([]);

  const logout = async (e: any) => {
    e.preventDefault();
    dispatch(logoutUser(accessToken));
  };

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
      console.log(error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="absolute mt-14">
      <div className=" flex flex-row flex-wrap gap-x-4 gap-y-10  justify-center items-start my-5 ml-64">
        {videos.map((video: any) => {
          return (
            <div key={video._id}>
              <ThumbnailCard
                title={video.title}
                views={video.views}
                duration={video.duration}
                thumbnail={video.thumbnail}
                createdAt={video.createdAt}
                ownerAvatar="https://github.com/shadcn.png"
                ownerName={"Code With Chai"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
