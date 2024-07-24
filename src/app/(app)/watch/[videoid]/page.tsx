"use client";

import { commentUrlPath, videoUrlPath } from "@/app/config/url.const";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface Video {
  _id: string;
  videoFile: string;
  thumbnail: string;
  title: string;
  description: string;
  duration: number;
  views: number;
  isPublished: boolean;
  owner: Owner[];
  createdAt: string;
  updatedAt: string;
}

interface Owner {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  avatar: string;
}

interface Comments {
  _id: string;
  content: string;
  video: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export default function watchVideo({
  params,
}: {
  params: { videoid: string };
}) {
  const { videoid } = params;
  const accessToken = Cookies.get("accessToken");
  const [video, setVideo] = useState<Video | null>(null);
  const [videoOwner, setVideoOwner] = useState<Owner | null>(null);
  const [comments, setComments] = useState<Comments[]>([]);
  const userData = localStorage.getItem("userData") || "";
  const currentUser = JSON.parse(userData);

  const getVideo = async () => {
    try {
      const res = await fetch(`${videoUrlPath.getVideoById}${videoid}`, {
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
      const videoData = data.data[0];

      setVideo(videoData);
      setVideoOwner(videoData?.owner[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getComentsOnvideo = async () => {
    try {
      const res = await fetch(`${commentUrlPath.getVideoComments}${videoid}`, {
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
      const commentsData = data.data;

      setComments(commentsData.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getVideo();
    getComentsOnvideo();
  }, [videoid]);

  const formatCreatedAt = (dateString: string): string => {
    return dayjs(dateString).fromNow();
  };

  return (
    <>
      <div className="flex justify-center w-full absolute mt-20 h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full h-[450px] bg-black">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={video?.videoFile}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video?.title}
            />
          </div>
          <div className="mt-4">
            <h1 className="text-xl font-semibold">{video?.title}</h1>
            <div className="flex items-center mt-2">
              <Avatar>
                <AvatarImage
                  className="w-10 h-10 rounded-full"
                  src={videoOwner?.avatar}
                />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-semibold">{videoOwner?.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  1.56M subscribers
                </p>
              </div>
              <Button variant="secondary" className="ml-auto">
                Join
              </Button>
              <Button variant="default" className="ml-2">
                Subscribe
              </Button>
            </div>
            <div className="flex items-center mt-4 space-x-4">
              <Button variant="ghost" className="flex items-center space-x-1">
                <ThumbsUpIcon className="h-5 w-5" />
                <span>4.6K</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-1">
                <ThumbsDownIcon className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="flex items-center space-x-1">
                <ShareIcon className="h-5 w-5" />
                <span>Share</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-1">
                <DownloadIcon className="h-5 w-5" />
                <span>Download</span>
              </Button>
            </div>
            <div className="mt-8 bg-muted p-4 rounded-md dark:bg-muted-dark dark:text-muted-foreground-dark">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {video?.description}
              </p>
            </div>
            <div className="mt-8 bg-muted p-4 rounded-md dark:bg-muted-dark dark:text-muted-foreground-dark">
              <h2 className="text-lg font-semibold">Comments</h2>
              <div className="mt-4 flex gap-2 items-end">
                <Textarea
                  placeholder="Add a comment..."
                  className="w-full rounded-md border border-muted-foreground/20 p-2 text-sm focus:border-primary focus:outline-none bg-muted dark:bg-muted-dark dark:text-muted-foreground-dark"
                />
                <Button variant={"default"} className="mt-2">
                  Comment
                </Button>
              </div>
              <div className="my-4 space-y-4">
                {comments &&
                  comments.map((comment: any) => {
                    return (
                      <div className="flex items-start">
                        <Avatar>
                          <AvatarImage
                            src={"https://github.com/shadcn.png"}
                            className="w-10 h-10 rounded-full"
                          />
                          <AvatarFallback>AD</AvatarFallback>
                        </Avatar>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">John Doe</p>
                              <p className="text-sm text-muted-foreground">
                                {formatCreatedAt(comment.createdAt)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {comment.owner ===
                                currentUser?.data?.user._id && (
                                <>
                                  <Button variant="ghost" size="icon">
                                    <FilePenIcon className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <TrashIcon className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </>
                              )}
                              <Button variant="ghost" size="icon">
                                <ThumbsUpIcon className="h-4 w-4" />
                                <span className="sr-only">Like</span>
                              </Button>
                            </div>
                          </div>
                          <p className="mt-2 text-sm">{comment.content}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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

function FilePenIcon(props: any) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function ShareIcon(props: any) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}

function ThumbsDownIcon(props: any) {
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
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props: any) {
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
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function TrashIcon(props: any) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
