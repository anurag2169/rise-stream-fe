"use client";

import { commentUrlPath, videoUrlPath } from "@/app/config/url.const";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectUserState } from "@/app/lib/features/user/userSlice";
import Comments from "@/app/components/ui/comments/Comments";
import VideoDescription from "@/app/components/ui/videoDescription/VideoDescription";
import VideoActionBtn from "@/app/components/ui/videoActionBtn/VideoActionBtn";
import { Owner, Video, Comment } from "@/app/types/video.type";
import {
  getVideo,
  getCommentsOnVideo,
  addComment,
  editComment,
} from "@/app/services/videoService";

dayjs.extend(relativeTime);

export default function watchVideo({
  params,
}: {
  params: { videoid: string };
}) {
  const { videoid } = params;
  const [video, setVideo] = useState<Video | null>(null);
  const [videoOwner, setVideoOwner] = useState<Owner | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentUser, setCurrentUser] = useState<Owner | null>(null);
  const userState = useSelector(selectUserState);

  const fetchVideo = async () => {
    try {
      const videoData = await getVideo(videoid);
      setVideo(videoData);
      setVideoOwner(videoData?.owner[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const commentsData = await getCommentsOnVideo(videoid);
      setComments(commentsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async (content: any) => {
    try {
      await addComment(videoid, content);
      fetchComments();
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleEditComment = async (commentId: string, editedContent: any) => {
    try {
      await editComment(commentId, editedContent);
      fetchComments();
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  useEffect(() => {
    fetchVideo();
    setCurrentUser(userState?.data?.data?.user);
  }, [videoid, userState]);

  useEffect(() => {
    fetchComments();
  }, [videoid]);

  return (
    <>
      <div className="flex justify-center absolute my-20 h-screen mx-2 md:mx-32">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full lg:h-[450px] bg-black">
            <video
              className=" w-full h-full "
              src={video?.videoFile}
              controls
              id="video-player"
              preload="auto"
              poster={video?.thumbnail}
              playsInline
            ></video>
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
                <Link href={`/channel/${videoOwner?.username}`}>
                  <p className="text-sm font-semibold">
                    {videoOwner?.fullName}
                  </p>
                </Link>
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
              <VideoActionBtn />
            </div>
            <div>
              <VideoDescription
                description={video?.description}
                channelName={videoOwner?.fullName}
                channelAvatar={videoOwner?.avatar}
                channelUserName={videoOwner?.username}
                subscriber={"10.5M"}
              />
            </div>
            <div>
              <Comments
                comments={comments}
                currentUser={currentUser}
                onAddComment={handleAddComment}
                onEditComment={handleEditComment}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
