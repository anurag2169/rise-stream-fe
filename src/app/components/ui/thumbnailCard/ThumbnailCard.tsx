import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  ClockIcon,
  Cross1Icon,
  Cross2Icon,
  DotsHorizontalIcon,
  DotsVerticalIcon,
  DownloadIcon,
  FileTextIcon,
  ListBulletIcon,
  PlusIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from "next/image";

dayjs.extend(relativeTime);

interface ThumbnailCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  createdAt?: string;
  views?: number;
  ownerAvatar?: string;
  ownerName?: string;
  videoUrl?: string;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  title,
  thumbnail,
  duration,
  createdAt,
  views,
  ownerAvatar,
  ownerName,
  videoUrl,
}) => {
  const [isHovered, setisHovered] = useState(false);
  const [previewError, setpreviewError] = useState(false);

  useEffect(() => {
    setpreviewError(false);
  }, [isHovered]);

  const formatDuration = (duration: string): string => {
    const seconds = parseFloat(duration);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const formatCreatedAt = (dateString: any): any => {
    return dayjs(dateString).fromNow();
  };

  const truncateText = (text: string, maxLength: number = 48): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const handlePreviewError = () => {
    setpreviewError(true);
  };

  return (
    <div className="w-full md:w-[360px] overflow-hidden rounded-xl bg-background dark:bg-gray">
      <figure
        className="relative w-full h-56 transition-all duration-300 rounded-xl overflow-hidden"
        onMouseEnter={() => setisHovered(false)}
        onMouseLeave={() => setisHovered(false)}
      >
        {isHovered ? (
          previewError ? (
            <div className="w-full h-full flex text-center items-center justify-center bg-gray-200">
              <p className="text-red-500 text-bold">preview not available</p>
            </div>
          ) : (
            <video
              src={videoUrl}
              autoPlay
              loop
              onError={handlePreviewError}
              className="w-full h-full object-cover"
            />
          )
        ) : (
          <Image
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
            width={360}
            height={180}
            priority
          />
        )}
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {formatDuration(duration)}
        </span>
      </figure>

      <CardContent className="p-3 border-none  flex gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={ownerAvatar} alt={"rise stream logo"} />
          <AvatarFallback>RS</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-sm text-wrap font-medium">
            {truncateText(title, 40)}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {ownerName || "Rise Stream"}
          </p>
          <p className="text-xs text-muted-foreground">
            {views} views • {formatCreatedAt(createdAt)}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <DotsVerticalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 gap-x-2 ">
            <DropdownMenuItem>
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Add to queue</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ClockIcon className="mr-2 h-4 w-4" />
              <span>Save to Watch Later</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ListBulletIcon className="mr-2 h-4 w-4" />
              <span>Save to playlist</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DownloadIcon className="mr-2 h-4 w-4" />
              <span>Download</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2Icon className="mr-2 h-4 w-4" />
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Cross1Icon className="mr-2 h-4 w-4" />
              <span>Not interested</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Cross2Icon className="mr-2 h-4 w-4" />
              <span>Dont recommend channel</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <FileTextIcon className="mr-2 h-4 w-4" />
              <span>Report</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </div>
  );
};

export default ThumbnailCard;
