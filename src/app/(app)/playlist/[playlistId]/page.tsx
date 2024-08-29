"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense, useEffect, useState } from "react";
import { extractAndSetGradient } from "@/app/utils/imageColorPicker";
import PlaylistVideosList from "@/app/components/ui/playlist/PlaylistVideosList";
import { getPlaylistById } from "@/app/services/playlistService";
import { Owner, Playlist, Video } from "@/app/types/playlist.types";
import Link from "next/link";
import { formatCreatedAt } from "@/app/utils/dateFormater";
import PlaylistDetails from "@/app/components/ui/playlist/PlaylistDetails";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import { useSelector } from "react-redux";

const playlist = ({ params }: { params: { playlistId: string } }) => {
  const { playlistId } = params;

  const [gradientStyle, setGradientStyle] = useState({});
  const [gradientImage, setGradientImage] = useState("/ownerImage.png");
  const [playlistData, setPlaylistData] = useState<Playlist | null>(null);
  const [playlistVideosData, setPlaylistVideosData] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<Owner | null>(null);
  const userState = useSelector(selectUserState);

  const getPlaylistDetails = async () => {
    try {
      const plyData = await getPlaylistById(playlistId);
      setPlaylistData(plyData.data[0]);
      setPlaylistVideosData(plyData.data[0].videos);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGradient = async () => {
      try {
        const gradient = await extractAndSetGradient(gradientImage);
        setGradientStyle(gradient);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGradient();
  }, [gradientImage, playlistVideosData]);

  useEffect(() => {
    getPlaylistDetails();
    setCurrentUser(userState?.data?.data?.user);
  }, [userState]);

  const sortVideolist = () => {
    const nextList = [...playlistVideosData];
    nextList.reverse();
    setPlaylistVideosData(nextList);
  };
  if (loading) {
    return <PlaylistSkeleton />;
  }
  return (
    <div className="mt-20 h-screen absolute lg:mx-28">
      <div className="flex flex-col md:flex-row gap-4 p-4">
        <PlaylistDetails
          gradientStyle={gradientStyle}
          playlistThumbnail={playlistVideosData[0]?.thumbnail}
          plyName={playlistData?.name}
          playlistOwner={playlistData?.owner.username}
          playlistLength={playlistVideosData.length}
          playlistUpdatedAt={playlistData?.updatedAt}
          playlistDescription={playlistData?.description}
          playlistOwnerId={playlistData?.owner._id}
          currentUser={currentUser}
        />
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold">Sort</h2>
            <span className="cursor-pointer" onClick={sortVideolist}>
              <ListOrderedIcon className="w-6 h-6" />
            </span>
          </div>
          <div className="space-y-4">
            {playlistVideosData.map((video) => (
              <PlaylistVideosList key={video._id} videoDetails={video} />
            ))}
          </div>

          {playlistVideosData.length === 0 && (
            <div className="lg:w-full md:w-1/4 text-white p-4 rounded-lg flex justify-center items-center lg:mt-12">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">
                    No videos in playlist
                  </h2>
                  <p className="text-sm text-gray-300 mb-4">
                    Add some videos to get started.
                  </p>
                </div>
                <Link href="/">
                  <Button size="lg" variant="outline">
                    Add video to playlist
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default playlist;

function PlaylistSkeleton() {
  return (
    <div className="mt-7 lg:mx-28 flex flex-col md:flex-row gap-4 p-4 ">
      <Card className="w-full md:w-1/3 text-white">
        <CardHeader className="p-4">
          <Skeleton className="w-full h-48 rounded-lg" />
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-1/3" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
          </div>
          <Skeleton className="h-6 w-full" />
        </CardContent>
      </Card>
      <div className="w-full md:w-2/3">
        <div className="flex items-center justify-between p-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-6 w-6" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 border-b">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="w-40 h-24 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>
          <div className="flex items-center space-x-4 p-4 border-b">
            <Skeleton className="h-6 w-6" />
            <Skeleton className="w-40 h-24 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronDownIcon(props: any) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function DotIcon(props: any) {
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
      <circle cx="12.1" cy="12.1" r="1" />
    </svg>
  );
}

function DownloadIcon(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function ListOrderedIcon(props: any) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  );
}

function PlayIcon(props: any) {
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
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function ShuffleIcon(props: any) {
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
      <path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22" />
      <path d="m18 2 4 4-4 4" />
      <path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" />
      <path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" />
      <path d="m18 14 4 4-4 4" />
    </svg>
  );
}
