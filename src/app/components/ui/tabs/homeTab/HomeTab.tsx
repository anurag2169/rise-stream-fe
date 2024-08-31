import { addVideoToHistory } from "@/app/(app)/home/page";
import { VideoAndPlaylistCard } from "@/app/(app)/search/page";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import { Video } from "@/app/types/video.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const HomeTab = ({ channelVideos, channelId }: any) => {
  const latestVideos = channelVideos
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  const userState = useSelector(selectUserState);
  return (
    <div className="p-4">
      {latestVideos.length != 0 && (
        <h2 className="mb-4 text-xl font-bold">Recently Uploaded</h2>
      )}

      <>
        {latestVideos.map((video: Video) => (
          <div
            key={video?._id}
            className="flex flex-col  my-3"
            onClick={() => addVideoToHistory(video._id)}
          >
            <VideoAndPlaylistCard
              id={video?._id}
              title={video?.title}
              description={video?.description}
              fullname={video?.owner?.fullName}
              thumbnail={video?.thumbnail}
              avatarUrl={video?.owner?.avatar}
              views={video?.views}
              createdAt={video?.createdAt}
              duration={video?.duration}
            />
          </div>
        ))}
        {latestVideos.length === 0 && (
          <div className="flex flex-col items-center justify-center my-3">
            <h2 className="mb-4 text-xl font-bold">
              Please Upload Some Videos!
            </h2>
            {userState?.data?.data?.user?._id === channelId && (
              <Link href={"/uploadVideo"}>
                <Button variant={"default"}>Click Here</Button>
              </Link>
            )}
          </div>
        )}
      </>
    </div>
  );
};

export default HomeTab;
