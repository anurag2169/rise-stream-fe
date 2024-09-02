import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

dayjs.extend(relativeTime);

interface ThumbnailCardProps {
  title: string;
  thumbnail: string;
  duration: string;
  createdAt: string;
  views: number;
  ownerAvatar: string;
  ownerName: string;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({
  title,
  thumbnail,
  duration,
  createdAt,
  views,
  ownerAvatar,
  ownerName,
}) => {
  const formatDuration = (duration: string): string => {
    const seconds = parseFloat(duration);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds}`;
  };

  const formatCreatedAt = (dateString: string): string => {
    return dayjs(dateString).fromNow();
  };

  const truncateText = (text: string, maxLength: number = 48): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <Card className="w-80 mx-2 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="relative h-48">
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(duration)}
          </div>
        </div>
        <CardContent className="p-3">
          <div className="flex space-x-4">
            <Avatar className="rounded-full">
              <AvatarImage
                src={ownerAvatar}
                alt="Channel avatar"
                className="w-10 h-10 rounded-full"
              />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div className="min-h-20">
              <h3 className="text-sm  font-semibold text-gray-900 dark:text-gray-100">
                {truncateText(title)}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {ownerName || "Rise Stream"}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {views} views • {formatCreatedAt(createdAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ThumbnailCard;
