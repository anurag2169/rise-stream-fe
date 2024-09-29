import { Card, CardContent } from "@/components/ui/card";
import { LockClosedIcon, VideoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

const PlaylistCard = ({
  playlistId,
  playlistTitle,
  playlistUpdatedAt,
  playlistStatus = "public",
  playlistImage = "/placeholder.svg",
  playlistImageAlt = "playListImage",
  playlistLength = 0,
}: any) => {
  const truncateText = (text: string, maxLength: number = 25): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const formatUpdatedAt = (dateString: string): string => {
    return dayjs(dateString).fromNow();
  };
  return (
    <>
      <Card className="overflow-hidden">
        <Link href={`/playlist/${playlistId}`}>
          <div className="relative">
            <Image
              src={playlistImage}
              alt={playlistImageAlt}
              className="w-full h-36 object-cover"
              width="240"
              height="120"
              style={{ aspectRatio: "240/120", objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <div className="flex items-center gap-2 text-white">
                <VideoIcon className="h-4 w-4" />
                <span className="text-sm">{playlistLength} videos</span>
              </div>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="text-base font-semibold">
              {truncateText(playlistTitle)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {formatUpdatedAt(playlistUpdatedAt)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <LockClosedIcon className="h-4 w-4" />
              <span className="text-sm">{playlistStatus}</span>
            </div>
            <p className="text-sm mt-1 pointer">View full playlist</p>
          </CardContent>
        </Link>
      </Card>
    </>
  );
};

export default PlaylistCard;
