"use client";
import { getWatchHistory } from "@/app/services/userService";
import React, { useEffect, useState } from "react";
import { Video } from "@/app/types/video.type";
import VideoAndPlaylistCard from "@/app/components/ui/videoPlaylistCard/VideoAndPlaylistCard";

interface HistoryVideo {
  videoDetails: Video;
  videoAddedAt: string;
}

const WatchHistory = () => {
  const [todaysWatchHistory, setTodaysWatchHistory] = useState<
    HistoryVideo[] | null
  >(null);
  const [yesterdayWatchHistory, setyesterdayWatchHistory] = useState<
    HistoryVideo[] | null
  >(null);

  const [loading, setloading] = useState(true);

  const getUserWatchHistory = async () => {
    try {
      const res = await getWatchHistory();
      const todayVideos = filterTodaysVideos(res.data, "today");
      setTodaysWatchHistory(todayVideos);
      const yesterdayVideos = filterTodaysVideos(res.data, "yesterday");
      setyesterdayWatchHistory(yesterdayVideos);
      setloading(false);
    } catch (error) {
      console.error(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getUserWatchHistory();
  }, []);

  const filterTodaysVideos = (videos: HistoryVideo[], day: any) => {
    const today = new Date();

    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    if (day === "today") {
      return videos.filter((video) => {
        const videoDate = new Date(video.videoAddedAt);
        return videoDate >= startOfToday && videoDate <= endOfToday;
      });
    } else {
      return videos.filter((video) => {
        const videoDate = new Date(video.videoAddedAt);
        return videoDate < startOfToday || videoDate > endOfToday;
      });
    }
  };

  if (loading) {
    return <>loading...</>;
  }

  return (
    <div className="w-10/12 mt-20 mx-4 md:mx-36 h-screen absolute">
      <h1 className="text-2xl md:text-4xl font-bold lg:pb-16 pb-5">
        Watch history
      </h1>

      <h3 className="text-md md:text-2xl font-bold pb-3">Today</h3>
      {todaysWatchHistory && todaysWatchHistory.length > 0 ? (
        todaysWatchHistory.map((video: any) => (
          <div key={video?.videoDetails._id} className="flex flex-col my-2">
            <VideoAndPlaylistCard
              id={video?.videoDetails._id}
              title={video?.videoDetails.title}
              description={video?.videoDetails.description}
              fullname={video?.videoDetails.owner?.fullName}
              thumbnail={video?.videoDetails.thumbnail}
              avatarUrl={video?.videoDetails.owner?.avatar}
              views={video?.videoDetails.views}
              createdAt={video?.videoDetails.createdAt}
              duration={video?.videoDetails.duration}
            />
          </div>
        ))
      ) : (
        <span className="text-sm md:text-xl font-medium py-5">
          Your video history is empty. Add some videos to see them here.
        </span>
      )}

      <h3 className="text-md md:text-2xl font-bold  py-7">Yesterday</h3>
      {yesterdayWatchHistory && yesterdayWatchHistory.length > 0 ? (
        yesterdayWatchHistory.map((video) => (
          <div key={video?.videoDetails._id} className="flex flex-col my-2">
            <VideoAndPlaylistCard
              id={video?.videoDetails._id}
              title={video?.videoDetails.title}
              description={video?.videoDetails.description}
              fullname={video?.videoDetails.owner?.fullName}
              thumbnail={video?.videoDetails.thumbnail}
              avatarUrl={video?.videoDetails.owner?.avatar}
              views={video?.videoDetails.views}
              createdAt={video?.videoDetails.createdAt}
              duration={video?.videoDetails.duration}
            />
          </div>
        ))
      ) : (
        <span className="text-sm md:text-xl font-medium py-5">
          There were no updates to your video history yesterday.
        </span>
      )}
    </div>
  );
};

export default WatchHistory;
